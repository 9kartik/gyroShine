class ShinyCoin extends HTMLElement {

    attachStyles(){
      this.styledDom = this.attachShadow({mode: 'open'});
      this.styledDom.innerHTML = `
        <style>
        .imgRound {
            border-radius: 50%;
            background-size: cover;
            background-repeat: no-repeat;
            height: ${this.size};
            width: ${this.size};
        }
        .xshine {
            position: relative;
        }
        .xshineAfter{
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            transform: rotate(0deg);
            background: rgba(255, 255, 255, 0.13);
            background: radial-gradient(ellipse at 0% 0%, rgba(255,255,255,0.4) 30%, ${this.shade});
            border-radius: 50%;
        }
        .centered{
            text-align: center;
        }
        .xcentered{
            display: flex;
            justify-content: center;
        }
        .inline{
            display: inline-block;
        }
        </style>
      `
    }
    fragmentInit(){
        this.fragment = new DocumentFragment();
        this.pContainer = document.createElement('div');
        this.pContainer.classList.add(this.isCentered? 'xcentered' : 'none')
        this.pContainer.classList.add(this.isInline? 'inline': 'none')
        this.containerBox = document.createElement('div');
        this.containerBox.className = 'inline imgRound xshine centered';
        this.containerBox.style.backgroundImage = `url("${this.img}")`;

        this.shineElement = document.createElement('div')
        this.shineElement.className = 'xshineAfter';
        
        this.containerBox.appendChild(this.shineElement);
        this.pContainer.appendChild(this.containerBox);
        this.fragment.appendChild(this.pContainer);
    }
    gyroForce(){
        function deviceTilted(evt){
            this.shineElement.setAttribute('style', 'transform:rotate('+ ((Math.atan2(evt.gamma, evt.beta) * 180/ Math.PI) + 30) + 'deg)')
        }
        function ontilt(shiner){
            window.addEventListener('deviceorientation', deviceTilted.bind(this))
        }
        ontilt.call(this);
    }
    connectedCallback() {
        this.fragmentInit();
        this.attachStyles();
        this.gyroForce.call(this);
        this.styledDom.append(this.fragment);
    }
    disconnectedCallback() {
    }
    constructor() {
      super();
      this.img = this.getAttribute('imgurl');
      this.size = this.getAttribute('radius')|| '10ch';
      this.shade = this.getAttribute('shade')|| 'black';
      this.isCentered = ['yes','true'].indexOf(this.getAttribute('centered'))>-1;
      this.isInline = ['yes','true'].indexOf(this.getAttribute('inline'))>-1;
    }
  
  }

  export default ShinyCoin;