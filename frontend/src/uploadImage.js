import { getStorage, ref, uploadBytes,getDownloadURL , deleteObject } from "firebase/storage";
import { initializeApp } from "firebase/app";

import { v4 as uuidv4 } from "uuid";
 

const firebaseConfig = {
  apiKey:  process.env.REACT_APP_API_KEY ,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN ,
  projectId: process.env.REACT_APP_PROJECT_ID ,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET ,
  messagingSenderId: process.env.REACT_APP_MESSAGING_ID ,
  appId: process.env.REACT_APP_APP_ID ,
};
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

async function UploadImage(file, route) {
  const timestamp = new Date()
    .toISOString()
    .slice(0, 19)
    .replace(/-/g, "")
    .replace(/:/g, "")
    .replace("T", "_");
  
  const fileName = `image_${timestamp}_${file.name}`;
  const storageRef = ref(storage, `${route}/${fileName}`);

  try {
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}


function DeleteImage(url) {
  try {
    const storage = getStorage();
    const storageRef = ref(storage, url);

    return deleteObject(storageRef).then(() => {
      return { success: true };
    });
  } catch (error) {
    return { error: "Image deletion failed." };
  }
}

export  {UploadImage,DeleteImage};