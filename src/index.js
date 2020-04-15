import './style.scss'
import Page from './Page/Page'
const init = () => new Page().init()
const ready = (fn) => {
    if (document.readyState != 'loading') {
        fn()
    } else {
        document.addEventListener('DOMContentLoaded', fn)
    }
}
ready(init)
