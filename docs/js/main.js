"use strict";
var Game = (function () {
    function Game() {
        this.currentscreen = new StartScreen(this);
        this.gameLoop();
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.currentscreen.update();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.showScreen = function (screen) {
        this.currentscreen = screen;
    };
    Game.prototype.emptyScreen = function () {
        var container = document.getElementsByTagName("container")[0];
        container.innerHTML = "";
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var EndScreen = (function () {
    function EndScreen(g) {
        var _this = this;
        this.game = g;
        this.restartbtn = document.createElement("startbtn");
        this.winnerElement = document.createElement('winnerElement');
        var container = document.getElementsByTagName("container")[0];
        container.appendChild(this.restartbtn);
        container.appendChild(this.winnerElement);
        this.restartbtn.addEventListener("click", function () { return _this.switchScreens(); });
    }
    EndScreen.prototype.update = function () {
        this.restartbtn.innerHTML = "RESTART GAME";
    };
    EndScreen.prototype.switchScreens = function () {
        console.log('switch to gamescreen');
        this.game.emptyScreen();
        this.game.showScreen(new GameScreen(this.game));
    };
    EndScreen.prototype.emptyScreen = function () {
        console.log('emptyScreen');
        this.target.remove();
        var container = document.getElementsByTagName("container")[0];
        container.innerHTML = "";
    };
    return EndScreen;
}());
var GameScreen = (function () {
    function GameScreen(g) {
        this.score = 0;
        this.score2 = 0;
        this.game = g;
        this.playerone = new Player(this, 87, 68, 83, 65, "playerone");
        this.playertwo = new Player(this, 38, 39, 40, 37, "playertwo");
        this.target = new Target(this);
        this.scoreElement = document.createElement("scoreElement");
        this.scoreElement2 = document.createElement("scoreElement2");
        var container = document.getElementsByTagName('container')[0];
        container.appendChild(this.scoreElement);
        container.appendChild(this.scoreElement2);
        this.scoreElement2.innerHTML = "Score player 2: ";
        this.scoreElement.innerHTML = "Score player 1: ";
    }
    GameScreen.prototype.update = function () {
        this.playerone.update();
        this.playertwo.update();
        this.target.update();
        var hit = this.checkCollision(this.playerone.getRectangle(), this.target.getRectangle());
        if (hit) {
            console.log('hit 1');
            console.log(this.playerone.getRectangle());
            console.log(this.target.getRectangle());
            this.target.deleteTarget();
            this.target = new Target(this);
            this.score++;
            this.scoreElement.innerHTML = "Score player 1: " + this.score;
        }
        var hit2 = this.checkCollision(this.playertwo.getRectangle(), this.target.getRectangle());
        if (hit2) {
            console.log('hit 2');
            this.target.deleteTarget();
            this.target = new Target(this);
            this.score2++;
            this.scoreElement2.innerHTML = "Score player 2: " + this.score2;
        }
        if (this.score == 2) {
            this.emptyScreen();
            this.switchScreens();
            console.log('p1 wins');
        }
        if (this.score2 == 2) {
            this.emptyScreen();
            this.switchScreens();
            console.log('p2 wins');
        }
    };
    GameScreen.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    GameScreen.prototype.switchScreens = function () {
        console.log('switch to endscreen');
        this.game.showScreen(new EndScreen(this.game));
    };
    GameScreen.prototype.emptyScreen = function () {
        this.target.deleteTarget();
        console.log('emptyScreen');
        var container = document.getElementsByTagName("container")[0];
        container.innerHTML = "";
    };
    return GameScreen;
}());
var Player = (function () {
    function Player(p, up, right, down, left, cls) {
        var _this = this;
        this.score = 0;
        this.downSpeed = 0;
        this.upSpeed = 0;
        this.rightSpeed = 0;
        this.leftSpeed = 0;
        this.gamescreen = p;
        this.div = document.createElement("player");
        this.div.classList.add(cls);
        console.log(cls);
        var container = document.getElementsByTagName("container")[0];
        container.appendChild(this.div);
        this.upkey = up;
        this.rightkey = right;
        this.downkey = down;
        this.leftkey = left;
        this.x = 0;
        this.y = 200;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
    }
    Player.prototype.onKeyDown = function (e) {
        switch (e.keyCode) {
            case this.upkey:
                this.upSpeed = 10;
                break;
            case this.downkey:
                this.downSpeed = 10;
                break;
            case this.leftkey:
                this.leftSpeed = 10;
                break;
            case this.rightkey:
                this.rightSpeed = 10;
                break;
        }
    };
    Player.prototype.onKeyUp = function (e) {
        switch (e.keyCode) {
            case this.upkey:
                this.upSpeed = 0;
                break;
            case this.downkey:
                this.downSpeed = 0;
                break;
            case this.leftkey:
                this.leftSpeed = 0;
                break;
            case this.rightkey:
                this.rightSpeed = 0;
                break;
        }
    };
    Player.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    Player.prototype.update = function () {
        var newY = this.y - this.upSpeed + this.downSpeed;
        var newX = this.x - this.leftSpeed + this.rightSpeed;
        if (newY > 0 && newY + 80 < window.innerHeight)
            this.y = newY;
        if (newX > 0 && newX + 80 < window.innerWidth)
            this.x = newX;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return Player;
}());
var Target = (function () {
    function Target(p) {
        this.speedX = 0;
        this.speedY = 0;
        console.log('making target');
        this.gamescreen = p;
        this.target = document.createElement("target");
        var container = document.getElementsByTagName("container")[0];
        container.appendChild(this.target);
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.speedX = Math.round(Math.random() * 20) + 10;
        this.speedY = Math.round(Math.random() * 10) - 5;
    }
    Target.prototype.update = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.y + 40 > window.innerHeight || this.y < 0) {
            this.speedY *= -1;
        }
        if (this.x + 40 > window.innerWidth || this.x < 0) {
            this.speedX *= -1;
        }
        this.target.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    Target.prototype.deleteTarget = function () {
        console.log('deleting target');
        this.target.remove();
    };
    Target.prototype.getRectangle = function () {
        return this.target.getBoundingClientRect();
    };
    return Target;
}());
var StartScreen = (function () {
    function StartScreen(g) {
        var _this = this;
        this.game = g;
        this.startbtn = document.createElement("startbtn");
        this.controls = document.createElement("controls");
        var container = document.getElementsByTagName("container")[0];
        container.appendChild(this.startbtn);
        container.appendChild(this.controls);
        this.startbtn.addEventListener("click", function () { return _this.switchScreens(); });
    }
    StartScreen.prototype.update = function () {
        this.startbtn.innerHTML = "START GAME";
    };
    StartScreen.prototype.switchScreens = function () {
        console.log('switch to gamescreen');
        this.game.emptyScreen();
        this.game.showScreen(new GameScreen(this.game));
    };
    return StartScreen;
}());
//# sourceMappingURL=main.js.map