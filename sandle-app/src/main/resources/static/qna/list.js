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
      console.log(result.data);
      $("tbody").html(template(result.data));
    });
}

document.getElementById("new-qna").addEventListener("click", () => {
  location.href = "form.html";
});