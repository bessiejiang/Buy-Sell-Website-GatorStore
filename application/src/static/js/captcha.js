// captcha
const checkform = thisform => {
  let why = "";

  if (thisform.CaptchaInput.value == "") {
    why += "Please enter the captcha";
  } else {
    if (ValidCaptcha(thisform.CaptchaInput.value) == false) {
      why += "The Captcha does not match";
    }
  }

  if (why != "") {
    alert(why);
    return false;
  }
};

let a = Math.ceil(Math.random() * 9) + "";
let b = Math.ceil(Math.random() * 9) + "";
let c = Math.ceil(Math.random() * 9) + "";
let d = Math.ceil(Math.random() * 9) + "";
let e = Math.ceil(Math.random() * 9) + "";

let code = a + b + c + d + e;

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("txtCaptcha").value = code;
  document.getElementById("CaptchaDiv").innerHTML = code;
});

//check if matches input
const ValidCaptcha = () => {
  let str1 = document.getElementById("txtCaptcha").value.trim();
  let str2 = document.getElementById("CaptchaInput").value.trim();
  if (str1 === str2) {
    return true;
  }

  return false;
};
