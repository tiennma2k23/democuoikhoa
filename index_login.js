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
title.innerHTML = "Login to SocialBook";
main.append(title);
var username_input = document.createElement("input");
username_input.placeholder = "User name";
username_input.type = "text";
username_input.setAttribute("id", "username_input");
main.append(username_input);
var password_input = document.createElement("input");
password_input.placeholder = "Password";
password_input.setAttribute("id", "password_input");
password_input.type = "password";

main.append(password_input);
function solve() {
  var password_input = document.getElementById("password_input");
  var username_input = document.getElementById("username_input");
  if (password_input.value.length && username_input.value.length) {
    var ck = false;
    db.ref("users/").on("value", function (contents_object) {
      // post_content_container.innerHTML = "";
      if (contents_object.numChildren() == 0) {
        return;
      }

      var contents = Object.values(contents_object.val());
      // console.log(contents);
      var guide = [];
      var unordered = [];
      var ordered = [];

      for (var i, i = 0; i < contents.length; i++) {
        guide.push(i + 1);
        unordered.push([contents[i], contents[i].index]);
      }

      guide.forEach(function (key) {
        var found = false;
        unordered = unordered.filter(function (item) {
          if (!found && item[1] == key) {
            ordered.push(item[0]);
            found = true;
            return false;
          } else {
            return true;
          }
        });
      });

      ordered.forEach(function (data) {
        var username = data.username;
        var password = data.password;
        if (
          password == password_input.value &&
          username == username_input.value
        )
          ck = true;
      });
    });
    if (ck) {
      alert("Đăng nhập thành công !!!");
      window.close("index_login.html");
      window.open("index_socialbook.html");
    } else
      alert("Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản, mật khẩu");
  } else alert("Ngu quá, chưa nhập sao đăng nhập");
}
//
var button_div = document.createElement("div");
button_div.setAttribute("class", "button_div");
var login_btn = document.createElement("button");
login_btn.innerHTML = "Login";
login_btn.setAttribute("class", "login_button");
login_btn.onclick = solve;
button_div.append(login_btn);
var reg_btn = document.createElement("button");
reg_btn.innerHTML = "Sign up";
reg_btn.setAttribute("class", "reg_btn");
reg_btn.onclick = function () {
  window.close("index_login.html");
  window.open("index_register.html");
};
button_div.append(reg_btn);
main.append(button_div);
