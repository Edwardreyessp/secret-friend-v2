// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEUgRAzVSG9eNIV9DcudWrPnLjJLTjZAQ",
  authDomain: "secret-friend-424b3.firebaseapp.com",
  databaseURL: "https://secret-friend-424b3-default-rtdb.firebaseio.com",
  projectId: "secret-friend-424b3",
  storageBucket: "secret-friend-424b3.appspot.com",
  messagingSenderId: "671920835802",
  appId: "1:671920835802:web:7025ad16c0516369e3a9e3",
  measurementId: "G-VJTY524W1Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Functions
export const writeSecretFriend = (gifts) => {
  // const db = getDatabase();
  set(ref(database, "users/"), {
    gifts: gifts,
  });
};

export const getGift = async (id) => {
  const dbRef = ref(getDatabase());
  const data = await get(child(dbRef, `users/gifts/${id}`))
    .then(async (snapshot) => {
      if (snapshot.exists()) {
        const data = await snapshot.val();
        return data;
      } else {
        const data = "No data available";
        return data;
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return data;
};
