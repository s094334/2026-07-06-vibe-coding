/* =========================================================
   小測驗:一次只顯示一題(簡單版)
   - 選好選項後才能按「下一題」
   - 最後一題把「下一題」文字換成「送出」
   （送出後的結果計算尚未實作）
   ========================================================= */

// 抓需要的元素
var questions = document.querySelectorAll(".q");        // 五題
var stepText  = document.getElementById("quizStep");   // 進度數字
var prevBtn   = document.querySelector(".quiz__prev");  // 上一題
var nextBtn   = document.querySelector(".quiz__next");  // 下一題 / 送出

var current = 0;   // 目前在第幾題(從 0 開始)

// 依照 current 更新畫面
function showQuestion() {
  // 只顯示目前這一題
  for (var i = 0; i < questions.length; i++) {
    if (i === current) {
      questions[i].classList.add("is-active");
    } else {
      questions[i].classList.remove("is-active");
    }
  }

  // 更新進度數字
  stepText.textContent = current + 1;

  // 第一題時,「上一題」停用
  prevBtn.disabled = (current === 0);

  // 最後一題,把「下一題」改成「送出」
  if (current === questions.length - 1) {
    nextBtn.textContent = "送出";
  } else {
    nextBtn.textContent = "下一題";
  }

  // 這一題有沒有選?沒有就不能按下一題
  var picked = questions[current].querySelector("input:checked");
  nextBtn.disabled = !picked;
}

// 一選好選項,就重新更新按鈕狀態
document.querySelector(".quiz").addEventListener("change", showQuestion);

// 按「下一題」
nextBtn.addEventListener("click", function () {
  if (current < questions.length - 1) {
    current = current + 1;
    showQuestion();
  } else {
    // 最後一題按「送出」
    // TODO:計算適合的框架並顯示結果
  }
});

// 按「上一題」
prevBtn.addEventListener("click", function () {
  if (current > 0) {
    current = current - 1;
    showQuestion();
  }
});

// 一開始先顯示第一題
showQuestion();
