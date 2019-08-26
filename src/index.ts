import * as functions from "firebase-functions";
import * as express from "express";
import loaders from "./loaders";

const app = express();
loaders({ app });

app.get("/ping", (req, res) => res.send("Hello Firebase Function"));

app.listen(4000, error => {
  if (error) console.log(error);
  console.log("Firebase functions starting at port 4000");
});

exports.app = functions.https.onRequest(app);

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
