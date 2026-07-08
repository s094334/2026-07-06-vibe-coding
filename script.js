/* =========================================================
   小測驗(簡單版)
   - 一次只顯示一題,選好才能按「下一題」
   - 最後一題按「送出」→ 數出最多的框架,顯示結果
   ========================================================= */

// 抓需要的元素
const questions  = document.querySelectorAll(".q");       // 五題
const stepText   = document.getElementById("quizStep");   // 進度數字
const prevBtn    = document.querySelector(".quiz__prev");  // 上一題
const nextBtn    = document.querySelector(".quiz__next");  // 下一題 / 送出
const result     = document.querySelector(".result");      // 結果區
const resultName = document.querySelector(".result__name");
const resultDesc = document.querySelector(".result__desc");

let current = 0;   // 目前在第幾題(從 0 開始)

// 三個框架的結果文字
const info = {
  react:   { name: "React",   url: "https://react.dev/",   desc: "彈性高、生態龐大,適合想深入 JS、看重職缺與社群資源的你。" },
  vue:     { name: "Vue",     url: "https://vuejs.org/",    desc: "最好上手、語法貼近原生,適合想快速做出成果的初學者。" },
  angular: { name: "Angular", url: "https://angular.dev/",  desc: "全套框架、規範完整,適合大型專案與重視長期維護的團隊。" }
};

// ---------- 逐題顯示 ----------
function showQuestion() {
  // 只顯示目前這一題
  for (let i = 0; i < questions.length; i++) {
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
  const picked = questions[current].querySelector("input:checked");
  nextBtn.disabled = !picked;
}

// ---------- 送出:計算結果 ----------
function submitQuiz() {
  // 三個框架各得幾票
  const scores = { react: 0, vue: 0, angular: 0 };

  for (let i = 0; i < questions.length; i++) {
    const picked = questions[i].querySelector("input:checked");
    if (picked) {
      const fw = picked.getAttribute("data-fw");   // vue / react / angular
      scores[fw] = scores[fw] + 1;
    }
  }

  // 找出票數最多的(平手時依 react → vue → angular 的順序)
  let winner = "react";
  if (scores.vue > scores[winner]) { winner = "vue"; }
  if (scores.angular > scores[winner]) { winner = "angular"; }

  showResult(winner, true);      // 顯示並捲動到結果
}

// ---------- 顯示結果 ----------
function showResult(fw, scroll) {
  resultName.textContent = info[fw].name;          // 顯示框架名稱
  resultName.href = info[fw].url;                  // 名稱本身連到官方文件
  resultName.className = "result__name c-" + fw;   // 換成框架代表色
  resultDesc.textContent = info[fw].desc;
  result.style.borderTopColor = "var(--" + fw + ")";   // 頂部線條換成框架代表色
  result.hidden = false;

  if (scroll) {
    result.scrollIntoView({ behavior: "smooth" });
  }
}

// ---------- 事件 ----------
// 一選好選項,就重新更新按鈕狀態
document.querySelector(".quiz").addEventListener("change", showQuestion);

// 按「下一題 / 送出」
nextBtn.addEventListener("click", function () {
  if (current < questions.length - 1) {
    current = current + 1;
    showQuestion();
  } else {
    submitQuiz();
  }
});

// 按「上一題」
prevBtn.addEventListener("click", function () {
  if (current > 0) {
    current = current - 1;
    showQuestion();
  }
});

// ---------- 一開始 ----------
showQuestion();
