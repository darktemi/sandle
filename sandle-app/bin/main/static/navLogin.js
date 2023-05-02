// nav 바
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

//  로그인 아이콘

fetch("../auth/user")
  .then((response) => {
    return response.json();
  })
  .then((result) => {
    console.log(result);

    let member = result.data;

    if (result.status === "success") {
      if (result.data.profilePhoto) {
        document.querySelector(
          "#u-photo"
        ).src = `http://mcjpfbyigjei16837664.cdn.ntruss.com/profile-photo/${result.data.profilePhoto}?type=f&w=40&h=40&faceopt=true&ttype=jpg`;
      } else {
        document.querySelector("#u-photo").src =
          "/sandle/assets/images/default_logo.jpg";
      }
      document.querySelector("#userEmail").innerHTML = member.nickname;
      $(".userID").html(result.data.email);
      $(".userID").css("display", "block");
      $(".logout").css("display", "block");
    } else {
      document.querySelector("#u-photo").src =
        "/sandle/assets/images/default_logo.jpg";
      $(".login").css("display", "block");
      $(".sign-up").css("display", "block");
    }
    if (!member.profilePhoto && document.querySelector("#m-photo")) {
      document.querySelector("#m-photo").src =
        "/sandle/assets/images/default_logo.jpg";
    }
    if (member.profilePhoto && document.querySelector("#m-photo")) {
      document.querySelector(
        "#m-photo"
      ).src = `http://mcjpfbyigjei16837664.cdn.ntruss.com/profile-photo/${member.profilePhoto}?type=f&w=300&h=300&faceopt=true&ttype=jpg`;
    }

    /* 마이페이지 */
    if (member.name && document.querySelector("#f-name")) {
      document.querySelector("#f-name").innerHTML = member.name;
    }
    if (member.nickname && document.querySelector("#f-nickname")) {
      document.querySelector("#f-nickname").innerHTML = member.nickname;
    }

    /* 관리자 공지사항 등록 */
    if (
      document.getElementById("userID").textContent == "darktemi90@nate.com" &&
      document.querySelector(".user2")
    ) {
      document.querySelector(".user2").style.display = "inline-block";
    }

    /* 문의글 관리자 답변 */
    if (
      member.email == "darktemi90@nate.com" &&
      document.getElementById("qna-response")
    ) {
      document.getElementById("qna-response").removeAttribute("readonly");
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
