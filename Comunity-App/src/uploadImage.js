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

function UploadImage(file, route,action) {
 
  if (action === "upload") {
    const timestamp = new Date()
      .toISOString()
      .slice(0, 19)
      .replace(/-/g, "")
      .replace(/:/g, "")
      .replace("T", "_");
    const randomString = uuidv4().substr(0, 5);
    const fileName = `image_${timestamp}_${randomString }_${file.name}`;
    const storageRef = ref(storage, `${route}/${fileName}`);

    return uploadBytes(storageRef, file).then((snapshot) => {
      
      return getDownloadURL(storageRef).then((url) => {
        return { url:url, pathname: `${route}/${fileName}` };
      });
      // return {url:URL.createObjectURL(file),pathname:imagePath}
    });
  } else if (action === "delete") {
    const storageRef = ref(storage, file);
    deleteObject(storageRef).then(() => {
    });
  }

 
}

export default UploadImage;