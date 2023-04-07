/*
  Dopetrope by HTML5 UP
  html5up.net | @ajlkn
  Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {
  var $window = $(window),
    $body = $("body");

  // Breakpoints.
  breakpoints({
    xlarge: ["1281px", "1680px"],
    large: ["981px", "1280px"],
    medium: ["737px", "980px"],
    small: [null, "736px"],
  });

  // Play initial animations on page load.
  $window.on("load", function () {
    window.setTimeout(function () {
      $body.removeClass("is-preload");
    }, 100);
  });

  // Dropdowns.
  $("#nav > ul").dropotron({
    mode: "fade",
    noOpenerFade: true,
    alignment: "center",
  });

  // Nav.

  // Title Bar.
  $(
    '<div id="titleBar">' + '<a href="#navPanel" class="toggle"></a>' + "</div>"
  ).appendTo($body);

  // Panel.
  $('<div id="navPanel">' + "<nav>" + $("#nav").navList() + "</nav>" + "</div>")
    .appendTo($body)
    .panel({
      delay: 500,
      hideOnClick: true,
      hideOnSwipe: true,
      resetScroll: true,
      resetForms: true,
      side: "left",
      target: $body,
      visibleClass: "navPanel-visible",
    });
})(jQuery);

// $(function () {
//   $("#accordion").accordion();
// });

// $(function () {
//   $("#tabs").tabs();
// });

fetch("../auth/user")
  .then((response) => {
    return response.json();
  })
  .then((result) => {
    console.log(result);
    if (result.status === "success") {
      document.querySelector("#email").innerHTML = result.data.email;
      document.querySelector(".default_logo").classList.remove("default_logo");
      document.querySelector(".logout").classList.remove("logout");
    } else {
      document.querySelector(".login").classList.remove("login");
      document.querySelector(".sign-up").classList.remove("sign-up");
    }
  });

function logout() {
  fetch("../auth/logout")
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      location.reload();
    })
    .catch((exception) => {
      console.log(exception);
    });
}
// ---------------------------------------------------







// ----------------------------------------------------------------------------------body



// list 조회하기

function getSandleBoard(e) {
  let no = e.currentTarget.getAttribute("data-no");
fetch("../sandleboards/" + no)
.then(response => {
  return response.json();
})
.then(result => {
  // console.log(result);
  if (result.status == 'failure') {
    alert('게시글을 조회할 수 없습니다.');
    location.href = "photofeed.html";
    return;
  }
  


// view 조회 (모달 창 띄우기)

  var img = document.createElement("img");
  let sandleboard = result;
  // img.src = sandleboard.photo;
   console.log(sandleboard);
  document.querySelector("#title").innerHTML = sandleboard.title;
  document.querySelector("#content").innerHTML = sandleboard.content;
  document.querySelector("#tag").innerHTML = sandleboard.tag;
  var photoDiv = document.getElementById("photo");
  photoDiv.style.backgroundImage = `url(${sandleboard.photo})`;
  photoDiv.style.backgroundSize = "cover";
  photoDiv.style.backgroundPosition = "center";
  photoDiv.style.backgroundRepeat = "no-repeat";
  photoDiv.appendChild(img);

  const $modal = $('.modal');
  const $btnOpenPopup = $('.photo-a');
  const $body = $('body');
  const $btnClosePopup = $('#x-circle');
  // const $sandle = $('#sandle');
  
  $btnOpenPopup.on('click', function () {
    $modal.css('display', 'block');
    $body.css('overflow', 'hidden');
    console.log("클릭됏다!");
  });
  
  $btnClosePopup.on('click', function () {
    $modal.css('display', 'none');
    $body.css('overflow', 'auto');
  });
  
  $("#sandle").on("click", function () {
    location.href = "../index.html";
  });
  

});
}



