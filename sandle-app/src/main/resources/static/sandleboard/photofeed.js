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

const $modal = $(".modal");
const cmt = document.querySelector("#comment");
const $body = $("body");
const html = document.querySelector("#image-template").innerHTML;
const templateEngine = Handlebars.compile(html);

const container = document.querySelector(".container");
const loadData = () => {
  fetch("../sandleboards")
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      // console.log(result.data);
      const images = result.data.reverse();
      container.innerHTML += templateEngine(images);
    });
};

// 무한 스크롤
let isLoading = false;
window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 10 && !isLoading) {
    isLoading = true;
    loadData();
    isLoading = false;
  }
});

loadData();

// 게시글 눌렀을시 게시글 View
let no;
function getSandleBoard(e) {
  no = e.currentTarget.getAttribute("data-no");
  fetch("../sandleboards/" + no)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      console.log(result);
      if (result.status == "failure") {
        alert("게시글을 조회할 수 없습니다.");
        location.href = "photofeed.html";
        return;
      }

      let sandleLoginUser = result.data.loginUser;

      var img = document.createElement("img");
      let sandleboard = result.data.board;
      document.querySelector("#title").innerHTML = sandleboard.title;
      document.querySelector("#content").innerHTML = sandleboard.content;
      document.querySelector("#tag").innerHTML = sandleboard.tag;

      var photoDiv = document.getElementById("photo");
      photoDiv.style.backgroundImage = `url(${sandleboard.photo})`;
      photoDiv.style.backgroundSize = "cover";
      photoDiv.style.backgroundPosition = "center";
      photoDiv.style.backgroundRepeat = "no-repeat";
      photoDiv.appendChild(img);

      let div = "";
      sandleboard.comments.forEach((comment) => {
        if (comment.no == 0) return;
        let html =
          `
        <div id="cmt-box">
        <div  style="display: flex; align-items: center;">
        <img src="../assets/images/profile_default_logo.png" id="cmt-image"/><span id="cmt-nickname">${comment.nickname}</span><br/>` +
          (result.data.loginUser.no === comment.writerNo
            ? `<img src="../assets/photofeed_images/comment-x-icon.png" class="cmt-x-logo" name="${comment.no}"/>`
            : "") +
          `</div>
        <div id="cmt-content">${comment.commentContent}</div>
        </div>
        `;
        div += html;
        console.log(comment);
      });
      document.querySelector("#comment").innerHTML = div;
      // 스크롤 내리기
      // cmt.scrollTo(0, document.body.scrollHeight);
      cmt.scrollTop = cmt.scrollHeight;
      $modal.css("display", "block");
      $body.css("overflow", "hidden");

      //삭제버튼 클릭 리스너--------------------------------------------------------
      document.querySelectorAll(".cmt-x-logo").forEach(function (element) {
        element.addEventListener("click", function () {
          const replyNo = element.getAttribute("name");
          fetch("../sandleboards/" + replyNo, {
            method: "DELETE",
          })
            .then((response) => {
              return response.json();
            })
            .then((result) => {
              if (result.status == "success") {
                console.log(result.data);
                // 삭제된 댓글을 바로 HTML에서 제거합니다.
                // let commentBox = document.querySelector(`[name="${replyNo}"]`).parentNode.parentNode;
                // commentBox.parentNode.removeChild(commentBox);
              } else {
                alert("삭제 실패!");
              }
            })
            .catch((exception) => {
              alert("삭제 중 오류 발생!");
              console.log(exception);
            });
        });
      });

      // 이벤트 위임 기법을 사용하여 이벤트 핸들러를 등록합니다.
      document.addEventListener("click", function (event) {
        // 클릭된 요소가 ".cmt-x-logo" 클래스를 가지고 있는지 확인합니다.
        if (event.target.classList.contains("cmt-x-logo")) {
          // 클릭된 요소가 ".cmt-x-logo" 클래스를 가진 경우, 이벤트를 처리합니다.
          const replyNo = event.target.getAttribute("name");
          deleteComment(replyNo);
          reloadComments();
        }
      });
    });
}

// --댓글 인서트

const inputField = document.getElementById("comment-insert");
inputField.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const content = inputField.value;
    const formData = new FormData();
    formData.append("content", content);
    formData.append("boardNo", no);

    // --로그인유정정보 가져오기
    fetch("../auth/userlogin")
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result.status == "failure") {
          alert("로그인하세영");
          location.href = "../auth/login_form.html";
        }
        console.log(result);
        inputComment();
        // 입력 필드 비우기
        inputField.value = "";
      });

    console.log(inputField.value);

    fetch("../sandleboards", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json(); // 서버에서 새로운 댓글 목록을 가져오기 위해 json 형식으로 변환
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("댓글 등록에 실패했습니다.");
      });
  }
});

// 삭젝랑 댓글 추가 함수
function inputComment() {
  //   let html = `
  //   <div id="cmt-box">
  //   <div  style="display: flex; align-items: center;">
  //   <img src="../assets/images/profile_default_logo.png" id="cmt-image"/><span id="cmt-nickname">${nickname}</span><br/>` +
  // `<img src="../assets/photofeed_images/comment-x-icon.png" class="cmt-x-logo" name="${comment.no}"/>`+
  //   `</div>
  //   <div id="cmt-content">${comment}</div>
  //   </div>
  //     `;
  //     addComment(html); // 새로운 댓글을 화면에 추가
  reloadComments(); // 서버에서 새로운 댓글 목록을 가져와서 화면을 업데이트

  document.querySelectorAll(".cmt-x-logo").forEach(function (element) {
    element.addEventListener("click", function () {
      const replyNo = element.getAttribute("name");
      deleteComment(replyNo);
      reloadComments();
    });
  });

  // document.querySelector("#comment").innerHTML += html;

  let deleteButtons = document.querySelectorAll(".cmt-x-logo");

  deleteButtons.forEach(function (element) {
    element.addEventListener("click", function () {
      const replyNo = element.getAttribute("name");
      console.log(replyNo);
      fetch("../sandleboards/" + replyNo, {
        method: "DELETE",
      })
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          if (result.status == "success") {
            reloadComments();
            console.log(result.data);
            // 삭제된 댓글을 바로 HTML에서 제거합니다.
            // let commentBox = document.querySelector(`[name="${replyNo}"]`).parentNode.parentNode;
            // commentBox.parentNode.removeChild(commentBox);
          } else {
            alert("삭제 실패!");
          }
        })
        .catch((exception) => {
          alert("삭제 중 오류 발생!");
          console.log(exception);
        });
    });
  });
}

const $btnClosePopup = $("#x-circle");
$btnClosePopup.on("click", function () {
  $modal.css("display", "none");
  $body.css("overflow", "auto");
});

$("#sandle").on("click", function () {
  location.href = "../index.html";
});

function addComment(comment) {
  let html = `
    <div id="cmt-box">
      <div style="display: flex; align-items: center;">
        <img src="../assets/images/profile_default_logo.png" id="cmt-image"/><span id="cmt-nickname">${comment.nickname}</span><br/>
        <img src="../assets/photofeed_images/comment-x-icon.png" class="cmt-x-logo" name="${comment.no}"/>
      </div>
      <div id="cmt-content">${comment.commentContent}</div>
    </div>
  `;
  document.querySelector("#comment").innerHTML += html;
}

function reloadComments() {
  fetch("../sandleboards/" + no)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.status == "failure") {
        alert("게시글을 조회할 수 없습니다.");
        location.href = "photofeed.html";
        return;
      }

      let sandleLoginUser = result.data.loginUser;
      let sandleboard = result.data.board;

      let div = "";
      sandleboard.comments.forEach((comment) => {
        if (comment.no == 0) return;
        let html = `
          <div id="cmt-box">
            <div style="display: flex; align-items: center;">
              <img src="../assets/images/profile_default_logo.png" id="cmt-image"/><span id="cmt-nickname">${
                comment.nickname
              }</span><br/>
              ${
                sandleLoginUser.no === comment.writerNo
                  ? `<img src="../assets/photofeed_images/comment-x-icon.png" class="cmt-x-logo" name="${comment.no}"/>`
                  : ""
              }
            </div>
            <div id="cmt-content">${comment.commentContent}</div>
          </div>
        `;
        div += html;
      });
      document.querySelector("#comment").innerHTML = div;
    });
}

function deleteComment(replyNo) {
  fetch("../sandleboards/" + replyNo, {
    method: "DELETE",
  })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.status == "success") {
        console.log(result.data);
        // 삭제된 댓글을 바로 HTML에서 제거합니다.
        // let commentBox = document.querySelector(`[name="${replyNo}"]`).parentNode.parentNode;
        // commentBox.parentNode.removeChild(commentBox);
        reloadComments(); // 댓글 목록을 서버에서 다시 불러와 화면을 업데이트합니다.
      } else {
        alert("삭제 실패!");
      }
    })
    .catch((exception) => {
      alert("삭제 중 오류 발생!");
      console.log(exception);
    });
}

document.querySelectorAll(".cmt-x-logo").forEach(function (element) {
  element.addEventListener("click", function () {
    const replyNo = element.getAttribute("name");
    deleteComment(replyNo);
  });
});