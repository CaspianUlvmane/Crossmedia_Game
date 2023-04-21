<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    

<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCjXEPkzslimBgvBM3NNns2RuzCED9Jpos",
    authDomain: "skorden-crossmedia.firebaseapp.com",
    projectId: "skorden-crossmedia",
    storageBucket: "skorden-crossmedia.appspot.com",
    messagingSenderId: "575255634457",
    appId: "1:575255634457:web:3157989639f02f63a00088",
    measurementId: "G-WMWBWC31F8"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>
</body>
</html>