import { initializeApp } from 'firebase';

const app = initializeApp({
    apiKey: "AIzaSyBOcKw3OGjZRe67KExNXU3UAGJYeQA-grU",
    authDomain: "v-fire-938bd.firebaseapp.com",
    databaseURL: "https://v-fire-938bd.firebaseio.com",
    projectId: "v-fire-938bd",
    storageBucket: "v-fire-938bd.appspot.com",
    messagingSenderId: "82106664262",
    appId: "1:82106664262:web:2491587d6534eabdd35147",
    measurementId: "G-ZBYQT1FSFL"
 });
export const db = app.firestore();