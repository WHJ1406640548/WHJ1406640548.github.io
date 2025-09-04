export const useBubble = (classStr: string) => {
  var canvas: any,
    ctx: any,
    width: number,
    height: number,
    bubbles: any[],
    animateHeader = true,
    lastTime = 0;
  function initBubble() {
    canvas = document.getElementById(classStr);
    ctx = canvas?.getContext("2d");
    resizeCanvas();
    bubbles = [];
    var num = width * 0.04;
    for (var i = 0; i < num; i++) {
      var c = new Bubble();
      bubbles.push(c);
    }
    animate();
  }
  function animate(timeStamp?: number) {
    var abs = (timeStamp ?? 0) - lastTime;
    if (abs > 15) {
      lastTime = timeStamp ?? 0;
      if (animateHeader) {
        ctx.clearRect(0, 0, width, height);
        for (var i in bubbles) {
          bubbles[i].draw();
        }
      }
    }
    requestAnimationFrame(animate);
  }
  function resizeCanvas() {
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;
  }
  window.addEventListener("resize", resizeCanvas);
  function Bubble(this: any) {
    var _this = this;
    (function () {
      _this.pos = {};
      init();
    })();
    function init() {
      _this.pos.x = Math.random() * width;
      _this.pos.y = height + Math.random() * 100;
      _this.alpha = 0.2 + Math.random() * 0.3;
      _this.alpha_change = 0.0005 + Math.random() * 0.0007;
      _this.scale = 0.1 + Math.random() * 0.3;
      _this.scale_change = Math.random() * 0.002;
      _this.speed = 0.2 + Math.random() * 0.5;
    }
    this.draw = function () {
      if (_this.alpha <= 0) {
        init();
      }
      _this.pos.y -= _this.speed;
      _this.alpha -= _this.alpha_change;
      _this.scale += _this.scale_change;
      ctx.beginPath();
      ctx.arc(
        _this.pos.x,
        _this.pos.y,
        _this.scale * 10,
        0,
        2 * Math.PI,
        false
      );
      ctx.fillStyle = "rgba(255,255,255," + _this.alpha + ")";
      ctx.fill();
    };
  }
  return {
    initBubble,
  };
};
