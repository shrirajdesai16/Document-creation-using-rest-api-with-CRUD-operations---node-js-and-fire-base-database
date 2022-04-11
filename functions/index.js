const functions = require("firebase-functions");

const firebase = require("firebase-admin");
const serviceAccount = require("./permission.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
});

const express = require("express");
const app = express();
const db = firebase.firestore();


const cors = require("cors");
app.use(cors({origin: true}));

// Get method for trial purpose
app.get("/hello_world", (req, res) => {
  const name = req.body.name;
  return res.status(200).send("Hello World ! The name passed is : " + name);
});

// POST method for trial purpose
app.post("/add-data", (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  return res.status(200).send("Hello World ! The name passed is : " + name);
});

  db.collection("users").doc("user1").set({
    name: name,
    phone: phone,
  }).then(() => {
    console.log("Document successfully written!");
  }).catch((error) => {
    console.error("Error writing document: ", error);
  });
}); 

// GET METHOD
 app.get("/read-data", (req, res) => {
  const userid = req.body.userid;
  db.collection("users").doc("userid").get().then((doc) => {
    if (doc.exists) {
      return res.status(200).send(doc.data().name);
    } else {
      return res.status(200).send("No such users exists !");
    }
  }).catch((error) => {
    return res.status(200).send("Failed to read data !");
  });
});

// UPDATE method
app.patch("patch-data", (req, res) => {
  const userid = req.body.userid;
  db.collection("users").doc("userid").findByIdAndUpdate(_id,req.body).then(() => {
    return res.status(200).send("Document updated successfully !");
  }).catch((error) => {
    return res.status(200).send("Failed to update data !", error);
  });
});

// DELETE method
app.delete("delete-data", (req, res) => {
  const userid = req.body.userid;
  db.collection("users").doc("userid").delete().then(() => {
    return res.status(200).send("Document deleted successfully !");
  }).catch((error) => {
    return res.status(200).send("Failed to delete data !", error);
  });
});

exports.v2 = functions.https.onRequest(app);

