const progress = document.querySelector('.reading-progress');
const body = document.body;
const html = document.documentElement;

const updateSizes = () => ({
  height: Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight),
  vh: Math.max(html.clientHeight, window.innerHeight || 0)
});

let sizes = updateSizes();
let scrollY = (document.scrollHeight || window.scrollY || 0) - (document.clientTop || 0);

const update = () => progress.style.setProperty('--reading-progress', Number((1 - (sizes.height - scrollY - sizes.vh) / sizes.height) * 100).toFixed(2) + "%");

const onScroll = () => {
  if (Number.isNaN(Number((1 - (sizes.height - scrollY - sizes.vh) / sizes.height) * 100))) {
    console.log(scrollY, sizes, document.clientTop, document.scrollTop);
  }
  scrollY = (document.scrollHeight || window.scrollY || 0) - (document.clientTop || 0);
  requestAnimationFrame(update);
}

const onResize = () => {
  requestAnimationFrame(update);
}


const throttle = (fn, time) => {
  let throttlePause;
  return function (e) {
    if (throttlePause) return;
    else {
      throttlePause = true;
      setTimeout(() => { fn(); throttlePause = false; }, time);
    }
  }
}

if (progress) {
  window.addEventListener('scroll', throttle(onScroll, 200), false);
  window.addEventListener('resize', throttle(onResize, 100), false);
}