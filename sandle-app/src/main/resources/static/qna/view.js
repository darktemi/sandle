const values = location.href.split("?");
if (values.length == 1) {
alert("URL이 옳지 않습니다.");
location.href = "list.html";
}

// no=100
const param = values[1].split("=");
if (param.length == 1 || param[0] != "no") {
alert("URL이 옳지 않습니다.");
location.href = "list.html";
}

let no = parseInt(param[1]);
if (isNaN(no)) {
alert("URL이 옳지 않습니다.");
location.href = "list.html";
}
fetch("../qnas/" + no)
.then((response) => {
    return response.json();
})
.then((result) => {
    console.log(result.data);
    let qna = result.data;
    document.querySelector("#f-no").value = qna.no;
    document.querySelector("#f-member-id").value = qna.memberId;
    document.querySelector("#qna-title").value = qna.title;
    document.querySelector("#qna-content").value = qna.content;
    document.querySelector("#qna-response").value = qna.response;
    if(document.querySelector("#f-email").value === "darktemi90@nate.com") {
        document.getElementById('qna-response').removeAttribute('readonly');
    }
});

document.querySelector("#btn-list").onclick = function () {
history.back();
};

document.querySelector("#btn-update").onclick = function () {
const form = document.querySelector("#member-form");
const formData = new FormData(form);

fetch(
    "../qnas/" + document.querySelector("input[name='no']").value,
    {
    method: "PUT",
    body: formData,
    }
)
    .then((response) => {
    return response.json();
    })
    .then((result) => {
    console.log(result);
    if (result.status == "success") {
        location.href = "list.html";
    } else {
        alert("변경 실패!");
    }
    })
    .catch((exception) => {
    alert("변경 중 오류 발생!");
    console.log(exception);
    });
};

document.querySelector("#btn-delete").onclick = function () {
fetch(
    "../qnas/" + document.querySelector('input[name="no"]').value,
    {
    method: "DELETE",
    }
)
    .then((response) => {
    return response.json();
    })
    .then((result) => {
    if (result.status == "success") {
        location.href = "list.html";
    } else {
        alert("삭제 실패!");
    }
    })
    .catch((exception) => {
    alert("삭제 중 오류 발생!");
    console.log(exception);
    });
};