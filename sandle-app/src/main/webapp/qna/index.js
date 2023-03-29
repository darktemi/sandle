showInput();
getQnas();

const html = document.querySelector("#tr-template").innerHTML;
const templateEngine = Handlebars.compile(html);

function showInput() {
  let el = document.querySelectorAll(".input");
  for (let e of el) {
    e.classList.remove("invisible");
  }

  el = document.querySelectorAll(".edit");
  for (let e of el) {
    e.classList.add("invisible");
  }
}

function showEdit() {
  let el = document.querySelectorAll(".input");
  for (let e of el) {
    e.classList.add("invisible");
  }

  el = document.querySelectorAll(".edit");
  for (let e of el) {
    e.classList.remove("invisible");
  }
}

document.querySelector("input[name='keyword']").onkeyup = (e) => {
  getMembers(e.target.value);
};

document.querySelector("#btn-search").onclick = () => {
  getQnas(keyword);
};

function getQnas(keyword) {
  let qs = "";
  if (keyword) {
    qs = `?keyword=${keyword}`;
  }

  fetch("../qnas" + qs)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      document.querySelector("#qna-table > tbody").innerHTML =
        templateEngine(result.data);
    });
}

function getQna(e) {
  let no = e.currentTarget.getAttribute("data-no");

  fetch("../qnas/" + no)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.status == "failure") {
        alert("게시글을 조회할 수 없습니다.");
        return;
      }

      let member = result.data;
      console.log(student);
      document.querySelector("#q-no").value = qna.no;
      document.querySelector("#m-no").value = qna.memberNo;
      document.querySelector("#q-title").value = qna.title;
      document.querySelector("#q-response").value = qna.response;
      document.querySelector("#q-createdDate").innerHTML = qna.createdDate;

      showEdit();
    });
}

document.querySelector("#btn-insert").onclick = () => {
  const form = document.querySelector("#qna-form");
  const formData = new FormData(form);

  let json = JSON.stringify(Object.fromEntries(formData));

  fetch("../qnas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: json,
  })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.status == "success") {
        location.reload();
      } else {
        alert("입력 실패!");
        console.log(result.data);
      }
    })
    .catch((exception) => {
      alert("입력 중 오류 발생!");
      console.log(exception);
    });
};

document.querySelector("#btn-update").onclick = () => {
  const form = document.querySelector("#member-form");
  const formData = new FormData(form);

  // FormData ==> Query String
  // 방법1)
  //let qs = [...formData.entries()].map(x => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`).join('&');
  // 방법2)
  //let qs = new URLSearchParams(formData).toString();
  //console.log(qs);

  let json = JSON.stringify(Object.fromEntries(formData));
  //console.log(json);

  fetch("../members/" + document.querySelector("#m-no").value, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      //"Content-Type": "application/x-www-form-urlencoded"
    },
    //body: formData
    body: json,
    //body: qs
  })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.status == "success") {
        alert("변경 했습니다.");
        location.reload();
      } else {
        alert("변경 실패!");
        console.log(result.data);
      }
    })
    .catch((exception) => {
      alert("변경 중 오류 발생!");
      console.log(exception);
    });
};

document.querySelector("#btn-delete").onclick = () => {
  fetch("../members/" + document.querySelector("#m-no").value, {
    method: "DELETE",
  })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.status == "success") {
        location.reload();
      } else {
        alert("사용자 삭제 실패!");
      }
    })
    .catch((exception) => {
      alert("사용자 삭제 중 오류 발생!");
      console.log(exception);
    });
};

document.querySelector("#btn-cancel").onclick = () => {
  showInput();
};

// entries ==> query string
function toQueryStringFromEntries(entries) {
  let qs = "";
  for (let [key, value] of entries) {
    if (qs.length > 0) {
      qs += "&";
    }
    qs += encodeURIComponent(key) + "=" + encodeURIComponent(value);
  }
  return qs;
}

function toQueryStringFromEntries2(entries) {
  let arr = [];
  for (let entry of entries) {
    arr.push(entry);
  }

  //console.log(arr);

  let arr2 = arr.map(
    (x) => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`
  );
  //console.log(arr2);

  let str = arr2.join("&");
  //console.log(str);

  return str;
}

function toQueryStringFromEntries3(entries) {
  let arr = [...entries];

  //console.log(arr);

  let arr2 = arr.map(
    (x) => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`
  );
  //console.log(arr2);

  let str = arr2.join("&");
  //console.log(str);

  return str;
}
