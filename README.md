# The sitting: proposals

The House of the People's page for the Manchester sitting (27–29 November 2026): drafting proposals, the cluster rooms,
table work, the list of people and tables, Stick or shift, Fresh eyes, questions for the experts, and the hosts' tab.
It replaces the homework page and reads the same data, so every proposal keeps its number.

- `index.html` is the whole page. It is built from the Claude artifact "The proposals: tables and people" with the Firebase scripts added. Do not edit it by hand: change the artifact's source and rebuild.
- `firebase-config.js` is the public web config for the Firebase project (`session-5-activity`).
- `hosted.js` connects the page to Firebase. Members type their name and never see a sign-in. Hosts use the host passcode. Facilitators and cluster hosts share the facilitators' password. Experts share the experts' password.
- `firestore.rules` is the whole rules file for the Firebase project (version 3: proposals, Session 8 and the timetable). The timetable repo keeps a copy: change both together. Publishing rules replaces them for the whole project.
- `people-template.csv` shows the columns for the list of people.
- `webflow-embed.html` is the snippet for houseofthepeople.uk/proposals.

## Web addresses

`#wall` opens The wall, `#hosts` the hosts' tab, `#who` the list of people (hosts and facilitators), `#experts` the experts' page.

## Going live (once)

1. Firebase console → Authentication → Users: add `staff@houseofthepeople.uk` (facilitators' password) and `experts@houseofthepeople.uk` (experts' password). Sign-in method: Anonymous must be on.
2. Firebase console → Firestore Database → Rules: keep a copy of what is there, then paste all of `firestore.rules` and Publish.
3. Replace `index.html`, `hosted.js`, `README.md`, `firestore.rules` and `webflow-embed.html` in this repo. GitHub Pages serves them within a minute or two.
4. Webflow: update the Code Embed on /proposals from `webflow-embed.html` and publish.
5. Open the page with `#hosts`, sign in with the host passcode, and in Set-up: bring in the tidy history, then (People and tables) save the list of people and match proposals to people, then bring in the merge plan.

## Never on the live page

"Start afresh" in Set-up deletes every proposal and would change every number. It is for a test copy only.

## Rolling back

Put back the previous commit of `index.html` and `hosted.js`, and publish the saved copy of the previous rules (version 2).
