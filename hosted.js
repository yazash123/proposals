/* Connects the page to Firebase when it is served from GitHub Pages (index.html loads this; the copy inside Claude does not).
   Members never see a sign-in: each browser is given an anonymous Firebase account, which is what lets the rules say
   "only the browser that sent a proposal may change it". Hosts sign in with the host passcode, as on the Session 8 page. */
(function(){
  var HOST='host@houseofthepeople.uk', C=window.FIREBASE_CONFIG;
  if(!(window.firebase&&firebase.auth&&firebase.firestore&&C&&C.projectId)){
    /* Firebase did not load. Say so on the page rather than quietly saving to this browser only. */
    window.SITTING_BACKEND={ready:Promise.reject(new Error('Firebase did not load'))};
    window.SITTING_BACKEND.ready.catch(function(){});
    return;
  }
  var auth,db,liveUid='';
  try{ if(!firebase.apps.length)firebase.initializeApp(C); auth=firebase.auth(); db=firebase.firestore(); }
  catch(e){ console.error('[sitting] Firebase failed to start',e); window.SITTING_BACKEND={ready:Promise.reject(e)}; window.SITTING_BACKEND.ready.catch(function(){}); return; }
  /* A slow phone or a weak signal can take a long time to sign in. If the first wait runs out the page says it cannot
     reach the records, but it keeps trying, and when the sign-in does arrive it tells the page (late) so it can carry on. */
  var ready=new Promise(function(resolve,reject){
    var done=false, tries=0;
    function anon(){ auth.signInAnonymously().catch(function(e){
      console.error('[sitting] anonymous sign-in failed: is it switched on in the Firebase console?',e);
      if(!done){done=true;reject(e);}
      if(++tries<8)setTimeout(function(){ if(!auth.currentUser)anon(); },5000);
    }); }
    auth.onAuthStateChanged(function(u){
      if(u){ liveUid=u.uid; var x={db:db,uid:u.uid,host:u.email===HOST}; if(window.SITTING_BACKEND)window.SITTING_BACKEND.uid=u.uid;
        if(!done){done=true;resolve(x);} else if(window.SITTING_BACKEND&&window.SITTING_BACKEND.late){ var f=window.SITTING_BACKEND.late; window.SITTING_BACKEND.late=null; f(x); } }
      else anon();
    });
    setTimeout(function(){ if(!done){done=true;reject(new Error('Firebase sign-in timed out'));} },20000);
  });
  window.SITTING_BACKEND={
    ready:ready, uid:liveUid,
    hostSignIn:function(pass){ return auth.signInWithEmailAndPassword(HOST,pass).then(function(){return true;},function(){return false;}); },
    hostSignOut:function(){ return auth.signOut(); }
  };
})();
