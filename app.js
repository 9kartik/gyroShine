import ShinyCoin from './components/coin.js'
if (!window.DeviceOrientationEvent) {
    document.getElementById('nosupport').classList.remove('hidden')
}
customElements.define('shiny-coin', ShinyCoin);