// firebase-config.js

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getDatabase, ref, push } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';

const firebaseConfig = {
    // ... your other config options ...
    databaseURL: "https://basreng-store-data-default-rtdb.asia-southeast1.firebasedatabase.app", // Updated URL
};

// // Your Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyB-d9sb21XHAtzUTfLFA1NEodUarzUyQmY",
//     authDomain: "basreng-store-data.firebaseapp.com",
//     projectId: "basreng-store-data",
//     storageBucket: "basreng-store-data.firebasestorage.app",
//     messagingSenderId: "99845506237",
//     appId: "1:99845506237:web:984bf72737a80cfc0fa3d4",
//     measurementId: "G-LEN0FG561J"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, push };