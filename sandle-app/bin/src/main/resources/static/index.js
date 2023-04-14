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

fetch("auth/user")
  .then((response) => {
    return response.json();
  })
  .then((result) => {
    console.log(result);
    if (result.status === "success") {
      document.querySelector("#userEmail").innerHTML = result.data.email;
      document.querySelector(".profilePhoto").classList.remove("profilePhoto");
      document.querySelector(".logout").classList.remove("logout");
    } else {
      document.querySelector(".login").classList.remove("login");
      document.querySelector(".sign-up").classList.remove("sign-up");
    }
    if (result.data.profilePhoto) {
      document.querySelector(
        "#u-photo"
      ).src = `http://mcjpfbyigjei16837664.cdn.ntruss.com/profile-photo/${result.data.profilePhoto}?type=f&w=40&h=40&faceopt=true&ttype=jpg`;
    } else {
      document.querySelector("#u-photo").src =
        "/sandle/assets/images/default_logo.jpg";
    }
  });

function logout() {
  fetch("auth/logout")
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
