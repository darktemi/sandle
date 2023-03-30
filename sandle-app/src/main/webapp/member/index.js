showInput();
getSmembers();

let signState = false;
//let emailState = false;
console.log(signState);
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
  getSmembers(e.target.value);
};

document.querySelector("#btn-search").onclick = () => {
  getSmembers(keyword);
};

function getSmembers(keyword) {
  let qs = "";
  if (keyword) {
    qs = `?keyword=${keyword}`;
  }

  fetch("../smembers" + qs)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      document.querySelector("#smember-table > tbody").innerHTML =
        templateEngine(result.data);
    });
}


function getSmember(e) {
  let no = e.currentTarget.getAttribute("data-no");

  fetch("../smembers/" + no)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.status == "failure") {
        alert("회원을 조회할 수 없습니다.");
        return;
      }
      

      let smember = result.data;
      console.log(smember);
document.querySelector("#m-no").value = smember.no;
      document.querySelector("#m-name").value = smember.name;
      document.querySelector("#m-tel").value = smember.tel;
      document.querySelector("#m-email").value = smember.email;
      document.querySelector("#m-photo").value = smember.photo;
      document.querySelector("#m-nickname").value = smember.nickname;
      document.querySelector("#m-postNo").value = smember.postNo;
      document.querySelector("#m-basicAddress").value = smember.basicAddress;
      document.querySelector("#m-detailAddress").value = smember.detailAddress;
      document.querySelector("#m-birth").value = smember.birth;
      document.querySelector("#m-statusMessage").value = smember.statusMessage;
      document.querySelector("#m-createdDate").innerHTML = smember.createdDate;
      document.querySelector("#m-authority").value = smember.authority;


      showEdit();
    });
}

document.querySelector("#btn-insert").onclick = () => {
  const form = document.querySelector("#smember-form");
  const formData = new FormData(form);

  let json = JSON.stringify(Object.fromEntries(formData));
  check()
  if(signState) {

  fetch("../smembers", {
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
  } else {
    alert("중복을 확인해 주세요")
  }
};

function check() {
 
  var chk = document.querySelector("#smember-form"); 


  if (chk.email.value == "") {
      alert("이메일을 입력해주십시오");
      chk.email.focus();
      return false;
  }

  if (chk.password.value == "") {
      alert("비밀번호를 입력해주십시오");
      chk.password.focus();
      
      return false;
  }

  if (chk.name.value == "") {
      alert("이름을 입력해주십시오");
      chk.name.focus();
      return false;
  }

  if (chk.nickname.value == "") {
      alert("닉네임을 입력해주십시오");
      chk.nickname.focus();
      return false;
  }

  if (chk.tel.value == "") {
      alert("전화번호를 입력해주십시오");
      chk.tel.focus();
      return false;
  }

  if (chk.postNo.value == "") {
      alert("우편번호를 입력해주십시오");
      chk.postNo.focus();
      return false;
  }

  if (chk.basicAddress.value == "") {
      alert("기본주소를 입력해주십시오");
      chk.basicAddress.focus();
      return false;
  }


  if (chk.detailAddress.value == "") {
      alert("상세주소를 입력해주십시오");
      chk.detailAddress.focus();
      return false;
  }
  if (chk.birth.value == "") {
    alert("생년월일을 입력해주십시오");
    chk.birth.focus();
    return false;
}
      
} 


document.querySelector("#btn-update").onclick = () => {
  const form = document.querySelector("#smember-form");
  const formData = new FormData(form);

  // FormData ==> Query String
  // 방법1)
  //let qs = [...formData.entries()].map(x => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`).join('&');
  // 방법2)
  //let qs = new URLSearchParams(formData).toString();
  //console.log(qs);

  let json = JSON.stringify(Object.fromEntries(formData));
  //console.log(json);

  fetch("../smembers/" + document.querySelector("#f-no").value, {
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
  fetch("../smembers/" + document.querySelector("#f-no").value, {
    method: "DELETE",
  })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.status == "success") {
        location.reload();
      } else {
        alert("회원 삭제 실패!");
      }
    })
    .catch((exception) => {
      alert("회원 삭제 중 오류 발생!");
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





document.querySelector("#id-button").onclick = () => {
  let id = document.querySelector("#m-email").value;
  console.log(id);
  fetch("../smembers/" + id)
  .then((response) => {
    return response.json();
  })
  .then((result) => {
    const con1 = document.querySelector("#id-msg1");
    const con2 = document.querySelector("#id-msg2");
    const con3 = document.querySelector("#id-msg3");
    const box1 = document.querySelector("#m-email");
    
    
    if (result == 0) {
      con2.style.display = "block";
      con1.style.display = "none";
      con3.style.display = "none";
      box1.style.borderColor = "black";
      box1.style.boxShadow = "5px 5px 5px black";
      signState = true;
      //console.log(signState);
      // alert("회원가입가능요");
    } else if(result == 1) {
      con1.style.display = "block";
      con2.style.display = "none";
      con3.style.display = "none";
      box1.style.borderColor = "red";
      box1.style.boxShadow = "5px 5px 5px red";
      // alert("중복임");
    } else {
      con3.style.display = "block";
      con1.style.display = "none";
      con2.style.display = "none";
      box1.style.borderColor = "black";
      box1.style.boxShadow = "5px 5px 5px black";
      // alert("아이디입력해")
    }
  
    console.log(result);
      if (result.status == "failure") {
        alert("조회할 수 없습니다.");
        return;
      }

    });

    
  }


  let pwd = document.querySelector("#m-password");
  document.querySelector("#m-password").onkeyup = () => {
    console.log("하이하이마ㅓ디가");
  const regPass = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
  const pwcon = document.querySelector("#pw-msg");
  if (!regPass.test(pwd)) {
    pwcon.style.display = "block";
  } else {
    pwcon.style.display = "none";
  }


}

document.querySelector("#m-password").onkeyup = () =>{

  var pw = document.querySelector("#m-password").value;
  var num = pw.search(/[0-9]/g);
  var eng = pw.search(/[a-z]/ig);
  var spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
 
  const pwcon = document.querySelector("#pw-msg");

  
  if(pw.length < 10 || pw.length > 20) {
    pwcon.style.display = "block";
  }else if(pw.search(/\s/) != -1){
    pwcon.style.display = "block";
  }else if( (num < 0 && eng < 0) || (eng < 0 && spe < 0) || (spe < 0 && num < 0) ){
    pwcon.style.display = "block";
  }else {
    pwcon.style.display = "none"; 
  }
 
 }

