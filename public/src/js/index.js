import Game from './Game'
const init = () => new Game().init().init()
const ready = (fn) => {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}
ready(init)
