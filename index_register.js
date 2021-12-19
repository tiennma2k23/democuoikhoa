// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDk1NWDg_hH4UxfLQI6LGz0nufSXLoyMLE",
  authDomain: "socialbook-5670f.firebaseapp.com",
  databaseURL:
    "https://socialbook-5670f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "socialbook-5670f",
  storageBucket: "socialbook-5670f.appspot.com",
  messagingSenderId: "228296207303",
  appId: "1:228296207303:web:1990cad71479de7a9947e2",
  measurementId: "G-2Y1E7S1MVP",
};

firebase.initializeApp(firebaseConfig);
var db = firebase.database();

var main = document.getElementById("main");
var title = document.createElement("h1");
title.innerHTML = "Sign up";
main.append(title);
var username_input = document.createElement("input");
username_input.placeholder = "User name";
username_input.type = "text";
username_input.setAttribute("id", "username_input");
main.append(username_input);
var password_input = document.createElement("input");
password_input.placeholder = "Password";
password_input.type = "password";
password_input.setAttribute("id", "password_input");
main.append(password_input);

var button_div = document.createElement("div");
button_div.setAttribute("class", "button_div");

var reg_btn = document.createElement("button");
reg_btn.innerHTML = "Sign up";
reg_btn.setAttribute("class", "reg_btn");
reg_btn.onclick = function () {
  var username_input = document.getElementById("username_input");
  var password_input = document.getElementById("password_input");
  console.log(username_input.value);
  db.ref("users/").once("value", function (content_object) {
    var index = parseFloat(content_object.numChildren()) + 1;
    db.ref("users/" + `content_${index}`)
      .set({
        username: username_input.value,
        password: password_input.value,
        index: index,
      })
      .then(function () {
        alert("Đăng kí thành công!!!");
        window.close("index_register.html");
        window.open("index_login.html");
      });
  });
};
button_div.append(reg_btn);
main.append(button_div);
