fetch("../users/view")
    .then((response) => {
        return response.json();
    })
    .then((result) => {
        console.log(result);
        if (result.status == "failure") {
        alert("회원을 조회할 수 없습니다.");
        location.href = "/sandle/auth/login_form.html";
        }

        let member = result.data;
        console.log(member);
        document.querySelector("#f-member-id").value = member.no;
        document.querySelector("#f-nickname").value = member.nickname;
    });

    document.querySelector("#btn-list").onclick = () => {
        history.back();
    }

    document.querySelector("#btn-insert").onclick = () => {
    const form = document.querySelector("#member-form");
    const formData = new FormData(form);

    let json = JSON.stringify(Object.fromEntries(formData));
    console.log(json);

    fetch("../qnas", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: json,
    })
        .then((response) => {
        console.log(response);
        return response.json();
        })
        .then((result) => {
        console.log(result);
        if (result.status == "success") {
            alert("게시 완료!");
            location.href = "/sandle/qna/list.html";
        } else {
            alert("게시글 등록중 오류!");
            console.log(result.data);
        }
        })
        .catch((exception) => {
        alert("입력 중 오류 발생!");
        console.log(exception);
        });
    };