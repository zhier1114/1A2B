// ------------------------ 限制輸入欄位 --------------------------------
const inputs = document.querySelectorAll("input");

inputs.forEach((input, index) => {
  input.addEventListener("input", () => {
    if (!/^\d$/.test(input.value)) {
      input.value = ""; // 清空非數字輸入
      return;
    }
    if (index < inputs.length - 1) {
      inputs[index + 1].focus();
    }
  });

  input.addEventListener("focus", function () {
    input.select();
  });
});

// ---------------------- 產生答案：四位亂數 --------------------------------
let answer = "";

function createAnswer() {
  document.getElementById("successPage").classList.remove("d-flex");
  document.getElementById("successPage").classList.add("d-none");
  document.getElementById("failPage").classList.remove("d-flex");
  document.getElementById("failPage").classList.add("d-none");
  answer = "";
  while (answer.length < 4) {
    let num = Math.floor(Math.random() * 10).toString();
    if (!answer.includes(num)) {
      answer += num;
    }
  }
  console.log(answer);
  document.getElementById("answer1").innerHTML = "";
  document.getElementById("answer1").innerHTML = answer;
  document.getElementById("answer2").innerHTML = "";
  document.getElementById("answer2").innerHTML = answer;
  return answer;
}

function hasDuplicates(array) {
  return new Set(array).size !== array.length;
}

function hasEmpty() {
  return (
    document.getElementById("input1").value === "" ||
    document.getElementById("input2").value === "" ||
    document.getElementById("input3").value === "" ||
    document.getElementById("input4").value === ""
  );
}

document.addEventListener("DOMContentLoaded", () => {
  createAnswer();

  document.querySelectorAll(".newGameButton").forEach((button) => {
    button.addEventListener("click", () => {
      cleanResult();
      cleanDigits();
      resetCountDown();
      createAnswer();
    });
  });

  document.getElementById("submit").addEventListener("click", () => {
    myAnswer = "";
    myAnswer +=
      document.getElementById("input1").value +
      document.getElementById("input2").value +
      document.getElementById("input3").value +
      document.getElementById("input4").value;

    let answerArray = myAnswer.split("");

    if (hasDuplicates(answerArray)) {
      alert("答案不能有重複的數字");
      return;
    }

    if (hasEmpty()) {
      alert("答案不能有空白");
      return;
    }
    checkAnswer(myAnswer);
    let result = getResult();
    saveAnswer(myAnswer);
    saveResult(result);
  });
});

// ----------------------- 產生結果：xAxB --------------------------
let A = 0;
let B = 0;
function getResult() {
  let result = `${A}&nbsp;A&nbsp;${B}&nbsp;B`;
  document.getElementById("result").innerHTML = "";
  document.getElementById("result").innerHTML = result;
  return result;
}

// ----------------------- 答案判斷 --------------------------------
let myAnswer = "";
function checkAnswer(myAnswer) {
  A = 0;
  B = 0;
  if (myAnswer !== answer) {
    for (let i = 0; i < myAnswer.length; i++) {
      if (myAnswer[i] == answer[i]) {
        A++;
      } else if (answer.includes(myAnswer[i])) {
        B++;
      }
    }
    countDown();
    if (count == 0) {
      document.getElementById("failPage").classList.remove("d-none");
      document.getElementById("failPage").classList.add("d-flex");
    }
  } else {
    for (let i = 0; i < myAnswer.length; i++) {
      if (myAnswer[i] == answer[i]) {
        A++;
      } else if (answer.includes(myAnswer[i])) {
        B++;
      }
    }
    document.getElementById("successPage").classList.remove("d-none");
    document.getElementById("successPage").classList.add("d-flex");
  }
}

// ------------------------ 次數倒數 --------------------------
let count = 10;
function countDown() {
  count--;
  document.getElementById("countdown").innerHTML = "";
  document.getElementById("countdown").innerHTML = `剩餘${count}次`;
  return count;
}

function resetCountDown() {
  count = 10;
  document.getElementById("countdown").innerHTML = `剩餘${count}次`;
  return count;
}

// ------------------------ 答案／結果儲存 --------------------------
let answerRecord = "";
let resultRecord = "";
function saveAnswer(myAnswer) {
  answerRecord += myAnswer + "<br/>";
  document.getElementById("answerRecord").innerHTML = "";
  document.getElementById("answerRecord").innerHTML = answerRecord;
}
function saveResult(result) {
  resultRecord += result + "<br/>";
  document.getElementById("resultRecord").innerHTML = "";
  document.getElementById("resultRecord").innerHTML = resultRecord;
}
function cleanResult() {
  answerRecord = "";
  resultRecord = "";
  document.getElementById("result").innerHTML = "";
  document.getElementById("answerRecord").innerHTML = "";
  document.getElementById("resultRecord").innerHTML = "";
}

function cleanDigits() {
  document.getElementById("input1").value = "";
  document.getElementById("input2").value = "";
  document.getElementById("input3").value = "";
  document.getElementById("input4").value = "";
}
