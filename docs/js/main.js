"use strict";
var Ball = (function () {
    function Ball(g) {
        var _this = this;
        this.x = 0;
        this.y = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.game = g;
        this.div = document.createElement("ball");
        this.div.addEventListener('mousedown', function () { return _this.removeItem(); });
        document.body.appendChild(this.div);
        this.x = (Math.random() * (window.innerWidth / 2)) + (window.innerWidth / 4);
        this.y = (Math.random() * (window.innerHeight / 2)) + (window.innerHeight / 4);
        this.speedX = Math.round(Math.random() * 3) + 1;
        this.speedY = Math.round(Math.random() * 6) - 3;
        if (Math.random() > 0.5)
            this.speedX *= -1;
    }
    Ball.prototype.update = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.y + 40 > window.innerHeight || this.y < 0) {
            this.speedY *= -1;
        }
        if (this.x - 40 > window.innerWidth || this.x < 0) {
            this.speedX *= -1;
        }
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    Ball.prototype.removeItem = function () {
        console.log('remove');
        this.div.remove();
        this.game.removeArrayItem(this);
    };
    return Ball;
}());
var Game = (function () {
    function Game() {
        this.balls = [];
        for (var i = 0; i < 15; i++) {
            this.balls.push(new Ball(this));
        }
        this.gameLoop();
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        for (var _i = 0, _a = this.balls; _i < _a.length; _i++) {
            var b = _a[_i];
            b.update();
        }
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.removeArrayItem = function (arrayitem) {
        console.log('removing item');
        for (var i = 0; i < this.balls.length; i++) {
            if (this.balls[i] === arrayitem) {
                this.balls.splice(i, 1);
            }
        }
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
//# sourceMappingURL=main.js.map