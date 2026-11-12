# The sitting: proposals (homework page)

The House of the People's page for drafting proposals before the Manchester sitting.
Only the drafting page is open. The full page for the sitting replaces these files later and reads the same data.

- `index.html` is the whole page (built from the `sitting-homepage` folder; do not edit by hand).
- `firebase-config.js` is the public web config for the Firebase project.
- `hosted.js` connects the page to Firebase.

Hosts open the page with `#hosts` on the end of the address.

## Webflow

`webflow-embed.html` is the snippet for the page at houseofthepeople.uk/proposals. Paste all of it into one Code Embed, placed in a full-width section (not a Container), then publish the site. It loads this page from GitHub Pages in a frame and passes on `#hosts` from the address bar, so `houseofthepeople.uk/proposals#hosts` opens the hosts' sign-in.
