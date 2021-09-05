const string = `
/*1.准备块画布*/

.contain{
    height: 100vh;
    width: 100%;
    background-color: #333333;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* 2.画出一个圆,将天空画为蓝色，加上内阴影*/
.land{
    height: 200px;
    width: 200px;
    background: #0071e2;
    border-radius: 50%;
    box-shadow: 0px 3px 5px 3px #222 inset;
    overflow: hidden;
    transform: scale(2.5);
    position: relative;
}

/* 3.添加黄色的沙漠*/
.ground{
    background: #d8a811;
    width: 100%;
    height: 200px;
    top: 120px;
    position: absolute;
}

/* 4.画出渐变色的月亮*/
.sun{
    border-radius: 50%;
    width: 40px;
    height: 40px;
    background:linear-gradient(135deg , #ea5600 0%, #e50000 100%);
    position: absolute;
    left: 80px;
    top: 20px;
    animation: sunAnimation 1.2s ease-in-out infinite alternate;
}

/* 5.添加白色的星星*/
.stars{
    position: absolute;
    width: 2px;
    height: 2px;
    top: 60px;
    left: 62px;
    border-radius: 5px;
    background: white;
    animation: sparkle 1.9s ease-in-out infinite alternate;
}

/* 6.利用伪元素多添加两颗星星*/
.stars::after{
    position: absolute;
    content: ' ';
    right: 20px;
    top: 20px;
    width: 2px;
    height: 2px;
    border-radius: 5px;
    background: inherit;
    animation: sparkle 1.5s ease-in-out infinite alternate;
}
.stars::before{
    position: absolute;
    content: ' ';
    right:20px;
    bottom: 26px;
    width: 2px;
    height: 2px;
    border-radius: 5px;
    background: inherit;
    animation: sparkle 1.2s ease-in-out infinite alternate;
}

/* 6.利用+选择器，复制一份星星，并移动它的位置*/
.stars + .stars {
    top: 60px;
    left: 130px;
    } 
.stars + .stars::after{
    right: -20px;
    top: 20px;
    }
.stars + .stars::before{
    right:-20px;
    bottom: 26px;
}

 /* 7. 利用border由4个三角形组成,画出山脉 */
.mountain{
    position: absolute;
    bottom: 20px;
    left:70px;
    border-left: 30px solid transparent;   
    border-right: 90px solid transparent; 
    border-bottom: 100px solid #555;
}

/*8. 用伪元素画出沙漠的暗部 */
.mountain::before{
    position: absolute;
    content: "";
    left: -70px;
    border-left: 60px solid transparent;
    /* border-right: 0px solid transparent; */
    border-bottom: 100px solid #444;
    /* 歪斜一定的度数，做成山的暗面 */
    transform: skewX(-11deg);
}
.mountain+.mountain{
    bottom: -5px;
    left: 120px;
}
.mountain+.mountain +.mountain{
    bottom: -12px;
    left: 0;
    border-bottom: 100px solid #777777;
}
.mountain+.mountain+.mountain::before{
    border-bottom: 100px solid #666;
}

/*10. 添加星星和月亮的动画 */
@keyframes sparkle {
    0%{
        background-color: #fff;
        transform: scale(1);
    }
    100%{
        background-color: #ffce00;;
        transform: scale(1.1);
    }
}
@keyframes sunAnimation {
    0%{
        background: linear-gradient(135deg, #ea5600 0%, #e50000 100%);
        transform: scale(1);
    }
    100%{
        background: linear-gradient(135deg, #f55d05 0%, #e00000 100%);
        transform: scale(1.1);
    }
}    
`

let string2 = ''
const player = {
  id: undefined,
  time: 50,
  ui: {
    demo: document.querySelector('#demo'),
    demo2: document.querySelector('#demo2')
  },
  events: {
    '#btnPause': 'pause',
    '#btnPlay': 'play',
    '#btnSlow': 'slow',
    '#btnNormal': 'normal',
    '#btnFast': 'fast'
  },
  n: 1,
  init: () => {
    player.ui.demo.innerText = string.substr(0, player.n)
    player.ui.demo2.innerHTML = string.substr(0, player.n)
    player.bindEvents()
    player.play()
  },
  bindEvents: () => {
    for (let key in player.events) {
      if (player.events.hasOwnProperty(key)) {
        const value = player.events[key] // pause / play / slow
        document.querySelector(key).onclick = player[value]
      }
    }

  },
  run: () => {
    player.n += 1
    if (player.n > string.length) {
      window.clearInterval(player.id)
      return
    }

    if(string[player.n] === '\n'){
        string2 +='<br>'
    }else if(string[player.n] === ' '){
        string2 += '&nbsp'
    }else{
        string2 += string[player.n]
    }
    player.ui.demo.innerHTML = string2
    player.ui.demo2.innerHTML = string.substr(0, player.n)
    player.ui.demo.scrollTop = player.ui.demo.scrollHeight
  },
  play: () => {
    window.clearInterval(player.id)
    player.id = setInterval(player.run, player.time)
  },
  pause: () => {
    window.clearInterval(player.id)
  },
  slow: () => {
    player.pause()
    player.time = 600
    player.play()
  },
  normal: () => {
    player.pause()
    player.time = 50
    player.play()
  },
  fast: () => {
    player.pause()
    player.time = 0
    player.play()
  }
}

player.init()






