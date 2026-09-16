import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadString } from "firebase/storage";
import fs from "fs";

const firebaseConfig = JSON.parse(fs.readFileSync("./firebase-applet-config.json", "utf-8"));
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const storageRef = ref(storage, "test.txt");

uploadString(storageRef, "Hello world").then(() => {
  console.log("Success!");
  process.exit(0);
}).catch((e) => {
  console.error("Error:", e);
  process.exit(1);
});
