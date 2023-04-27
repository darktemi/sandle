getQna();

const template = Handlebars.compile(
  document.querySelector("#qna-template").innerHTML
);

function getQna(keyword) {
  let qs = "";
  if (keyword) {
    qs = `?keyword=${keyword}`;
  }

  fetch("../qnas" + qs)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.status == "failure") {
        alert("회원을 조회할 수 없습니다.");
        location.href = "/sandle/auth/login_form.html";
      }
      console.log(result.data);
      $("tbody").html(template(result.data));
    });
}

document.getElementById("new-qna").addEventListener("click", () => {
  location.href = "form.html";
});
