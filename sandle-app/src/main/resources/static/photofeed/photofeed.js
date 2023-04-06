const $modal = $('.modal');
const $btnOpenPopup = $('#photo-ex1');
const $body = $('body');
const $btnClosePopup = $('#x-circle');
// const $sandle = $('#sandle');

$btnOpenPopup.on('click', function () {
  $modal.css('display', 'block');
  $body.css('overflow', 'hidden');
});

$btnClosePopup.on('click', function () {
  $modal.css('display', 'none');
  $body.css('overflow', 'auto');
});

$("#sandle").on("click", function () {
  location.href = "../index.html";
});


// ----------------------------------------------------------------------------------body

// function getBoards() {
//   fetch("../boards")
//     .then((response) => {
//       return response.json();
//     })
//     .then((result) => {
//       console.log(result.data);
//     });
// }

const param = values[1].split("=")
if (param.length == 1 || param[0] != 'no') {
  alert("URL이 옳지 않습니다.");
  location.href = "list.html";
}

let no = parseInt(param[1]);
if (isNaN(no)) {
  alert("URL이 옳지 않습니다.");
  location.href = "list.html";
}

function ggggg() {
fetch("../sandleboards/" + 16)
.then(response => {
  return response.json();
})
.then(result => {
  console.log(result);
  if (result.status == 'failure') {
    alert('게시글을 조회할 수 없습니다.');
    location.href = "photofeed.html";
    return;
  }
  
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


});
}

