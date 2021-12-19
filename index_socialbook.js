let cntlike = 0,
  cntlike2 = 0;

var setting_menu = document.querySelector(".settings_menu");
function setting_menu_toggle() {
  setting_menu.classList.toggle("settings_menu_height");
}

var dark_white_btn = document.getElementById("dark_white_btn");
dark_white_btn.onclick = function () {
  dark_white_btn.classList.toggle("dark_white_btn_on");
  document.body.classList.toggle("dark_mode");

  if (localStorage.getItem("theme") == "dark") {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
};

if (localStorage.getItem("theme") == "light") {
  dark_white_btn.classList.remove("dark_white_btn_on");
  document.body.classList.remove("dark_mode");
} else if (localStorage.getItem("theme") == "dark") {
  dark_white_btn.classList.add("dark_white_btn_on");
  document.body.classList.add("dark_mode");
} else {
  localStorage.setItem("theme", "light");
}

// localStorage.setItem("theme", "dark");
// localStorage.getItem("theme");
var like = document.querySelector(".like");
var like2 = document.querySelector(".like2");

let cntclicklike = 0;
like.onclick = function () {
  cntlike++;
  var countlike = document.getElementById("countlike");
  var cntlikes = String(cntlike);
  countlike.innerHTML = cntlikes;
};
let cntclicklike2 = 0;
like2.onclick = function () {
  cntlike2++;
  var countlike = document.getElementById("countlike2");
  var cntlikes = String(cntlike2);
  countlike.innerHTML = cntlikes;
};

var inputbtn = document.querySelector(".inputbtn");
var post_menu = document.querySelector(".post_menu");
inputbtn.onclick = function () {
  post_menu.classList.toggle("post_menu_height");
};

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
function refresh() {
  let main = document.getElementById("post_in_socialbook");
  main.innerHTML = "";
  // var post_content_container = document.getElementById(
  //   "post_content_container"
  // );

  db.ref("posts/").on("value", function (contents_object) {
    // post_content_container.innerHTML = "";
    if (contents_object.numChildren() == 0) {
      return;
    }

    var contents = Object.values(contents_object.val());
    console.log(contents);
    var guide = [];
    var unordered = [];
    var ordered = [];

    for (var i, i = contents.length - 1; i >= 0; i--) {
      guide.push(i + 1);
      unordered.push([contents[i], contents[i].index]);
    }

    guide.forEach(function (key) {
      var found = false;
      unordered = unordered.filter(function (item) {
        if (!found && item[1] == key) {
          ordered.push(item[0]);
          found = true;
          console.log(item[0]);
          return false;
        } else {
          return true;
        }
      });
    });

    ordered.forEach(function (data) {
      var name = data.name;
      var poster = data.content;
      var cnt_like = data.cnt_like;

      //     let npost = `
      //       <div class="post_row">
      //         <div class="user_profile">
      //           <img src="images/member.png" alt="">
      //           <div>
      //             <p>${name}</p>
      //           </div>
      //         </div>
      //         <a href="#"><i class="fas fa-ellipsis-v"></i></a>
      //       </div>
      //       <p class="post_text">${poster} </p>
      //       <div class="post_row">
      //                   <div class="activity_icon">
      //                       <div><button class="like"><img src="images/like-blue.png" alt=""></button><span id="countlike">${cnt_like}</span></div>
      //                       <div><button class="cmt"><img src="images/comments.png" alt=""></button><span id="countcmt">100</span></div>
      //                       <div><button class="share"><img src="images/share.png" alt=""></button><span id="countshare">100</span></div>
      //                   </div>
      //                   <div class="post_profile_icon">
      //                       <img src="images/member.png" alt=""> <i class="fas fa-caret-down"></i>
      //                   </div>
      //               </div>
      // `;

      var npost = document.createElement("div");

      var post_row1 = document.createElement("div");
      post_row1.setAttribute("class", "post_row");
      var user_profile = document.createElement("div");
      user_profile.setAttribute("class", "user_profile");
      var img_user = document.createElement("img");
      img_user.src = "images/member.png";
      var name_user = document.createElement("div");
      var name_p = document.createElement("p");
      name_p.innerHTML = name;
      name_user.append(name_p);
      user_profile.append(img_user);
      user_profile.append(name_user);
      var post_row_a = document.createElement("a");
      var post_row_a_i = document.createElement("i");
      post_row_a_i.setAttribute("class", "fas fa-ellipsis-v");
      post_row_a.append(post_row_a_i);
      post_row1.append(user_profile);
      post_row1.append(post_row_a);
      npost.append(post_row1);

      var post_text = document.createElement("p");
      post_text.setAttribute("class", " post_text");
      post_text.append(poster);
      npost.append(post_text);

      var post_row2 = document.createElement("div");
      post_row2.setAttribute("class", "post_row");
      var activity_icon = document.createElement("div");
      activity_icon.setAttribute("class", "activity_icon");
      var like_div = document.createElement("div");
      var like = document.createElement("button");
      like.setAttribute("class", "like");
      var imglike = document.createElement("img");
      imglike.src = "images/like-blue.png";
      like.append(imglike);
      like_div.append(like);
      var countlike = document.createElement("span");
      countlike.setAttribute("id", "countlike");

      like.onclick = function () {
        cnt_like++;
        // data.cnt_like = cnt_like;
        // data["cnt_like"] = cnt_like;
        // /????
        countlike.innerHTML = cnt_like;
        like_div.append(countlike);
      };
      countlike.innerHTML = cnt_like;
      like_div.append(countlike);
      activity_icon.append(like_div);

      var cmt_div = document.createElement("div");
      var cmt = document.createElement("button");
      cmt.setAttribute("class", "cmt");
      var imgcmt = document.createElement("img");
      imgcmt.src = "images/comments.png";
      cmt.append(imgcmt);
      cmt_div.append(cmt);
      var countcmt = document.createElement("span");
      countcmt.setAttribute("id", "countcmt");
      countcmt.innerHTML = "100";
      cmt_div.append(countcmt);
      activity_icon.append(cmt_div);

      var share_div = document.createElement("div");
      var share = document.createElement("button");
      share.setAttribute("class", "share");
      var imgshare = document.createElement("img");
      imgshare.src = "images/share.png";
      share.append(imgshare);
      share_div.append(share);
      var countshare = document.createElement("span");
      countshare.setAttribute("id", "countshare");
      countshare.innerHTML = "100";
      share_div.append(countshare);
      activity_icon.append(share_div);

      post_row2.append(activity_icon);

      npost.append(post_row2);

      let newDiv = document.createElement("div");
      newDiv.className = "post_container";
      let newpost = document.createElement("div");
      newpost.append(npost);

      newDiv.append(newpost);
      main.append(newDiv);
    });
    // post_content_container.scrollTop =
    //   post_content_container.scrollHeight;
  });
}
refresh();
var _post = document.querySelector("._post");
_post.onclick = function () {
  post_menu.classList.toggle("post_menu_height");

  var content = document.getElementById("content");
  var nameuser = document.getElementById("nameuser");

  if (content.value == "" || nameuser.value == "") alert("Error");
  else {
    let main = document.getElementById("post_in_socialbook");
    main.innerHTML = "";
    db.ref("posts/").once("value", function (content_object) {
      var index = parseFloat(content_object.numChildren()) + 1;
      db.ref("posts/" + `content_${index}`)
        .set({
          name: nameuser.value,
          content: content.value,
          index: index,
          cnt_like: 0,
        })
        .then(refresh());
    });
  }

  //   let main = document.getElementById("main_content");
  //   let newDiv = document.createElement("div");
  //   newDiv.className = "post_container";
  //   let name = nameuser.value;
  //   let poster = content.value;
  //   nameuser.value = "";
  //   content.value = "";
  //   let npost = `
  //       <div class="post_row">
  //         <div class="user_profile">
  //           <img src="socialbook/images/member.png" alt="">
  //           <div>
  //             <p>${name}</p>
  //           </div>
  //         </div>
  //         <a href="#"><i class="fas fa-ellipsis-v"></i></a>
  //       </div>
  //       <p class="post_text">${poster} </p>
  // `;

  //   let newpost = document.createElement("div");
  //   newpost.innerHTML = npost;

  //   newDiv.appendChild(newpost);
  //   main.appendChild(newDiv);
};
