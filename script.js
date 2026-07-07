/* =========================================================
   小測驗:一次只顯示一題
   選好選項後,「下一題 ►」箭頭才會解鎖,按下才前進到下一題。
   (結果計算尚未實作)
   ========================================================= */
(function () {
  const form = document.getElementById('quizForm');
  if (!form) return;

  const questions = Array.from(form.querySelectorAll('.q'));
  const stepEl    = document.getElementById('quizStep');
  const totalEl   = document.getElementById('quizTotal');
  const prevBtn   = form.querySelector('.quiz__prev');
  const nextBtn   = form.querySelector('.quiz__next');

  let current = 0;

  if (totalEl) totalEl.textContent = questions.length;

  // 該題是否已作答
  function isAnswered(i) {
    return !!questions[i].querySelector('input[type="radio"]:checked');
  }

  function render() {
    // 只顯示目前這一題
    questions.forEach((q, i) => q.classList.toggle('is-active', i === current));
    if (stepEl) stepEl.textContent = current + 1;

    const isLast = current === questions.length - 1;

    // 第一題時「上一題」停用
    prevBtn.disabled = current === 0;
    // 最後一題把「下一題」文字換成「送出」
    nextBtn.textContent = isLast ? '送出' : '下一題 ►';

    // 未作答就不能前進 / 送出
    nextBtn.disabled = !isAnswered(current);
  }

  // 讓「下一題 / 送出」與「上一題」等寬(量測上一題,不改動它本身)
  function syncNextWidth() {
    nextBtn.style.minWidth = '';
    nextBtn.style.minWidth = prevBtn.getBoundingClientRect().width + 'px';
  }
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(syncNextWidth);
  } else {
    window.addEventListener('load', syncNextWidth);
  }
  window.addEventListener('resize', syncNextWidth);

  // 一選好選項就即時解鎖箭頭
  form.addEventListener('change', function (e) {
    if (e.target.matches('input[type="radio"]')) render();
  });

  nextBtn.addEventListener('click', function () {
    if (!isAnswered(current)) return;              // 沒選不前進
    if (current < questions.length - 1) {
      current++;
      render();
    } else {
      // 最後一題按「送出」
      // TODO:計算適合的框架並顯示結果(尚未實作)
    }
  });

  prevBtn.addEventListener('click', function () {
    if (current > 0) {
      current--;
      render();
    }
  });

  render();
})();
