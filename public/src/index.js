import Game from './Game/Game'
const init = () => new Game().init()
const ready = (fn) => {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}
ready(init)
