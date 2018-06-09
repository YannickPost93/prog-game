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
        var container = document.getElementsByTagName("container")[0];
        container.appendChild(this.restartbtn);
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
    return EndScreen;
}());
var GameScreen = (function () {
    function GameScreen(g) {
        this.score = 0;
        this.score2 = 0;
        this.game = g;
        this.playerone = new Playerone(this);
        this.playertwo = new PlayerTwo(this);
        this.target = new Target(this);
        this.scoreElement = document.createElement("scoreElement");
        this.scoreElement2 = document.createElement("scoreElement2");
        var container = document.getElementsByTagName('container')[0];
        container.appendChild(this.scoreElement);
        container.appendChild(this.scoreElement2);
        this.gameLoop();
    }
    GameScreen.prototype.gameLoop = function () {
        var _this = this;
        var hit = this.checkCollision(this.playerone.getRectangle(), this.target.getRectangle());
        if (hit) {
            console.log('hit');
            this.target.deleteTarget();
            this.target = new Target(this);
            this.score++;
            this.scoreElement.innerHTML = "Score player 1: " + this.score;
        }
        var hit2 = this.checkCollision(this.playertwo.getRectangle(), this.target.getRectangle());
        if (hit2) {
            console.log('hit2');
            this.target.deleteTarget();
            this.target = new Target(this);
            this.score2++;
            this.scoreElement2.innerHTML = "Score player 2: " + this.score2;
        }
        if (this.score == 20) {
            this.switchScreens();
            console.log('score=10');
        }
        if (this.score2 == 20) {
            this.switchScreens();
            console.log('score=10');
        }
        this.playerone.update();
        this.playertwo.update();
        this.target.update();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    GameScreen.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    GameScreen.prototype.update = function () {
    };
    GameScreen.prototype.deleteTarget = function () {
        console.log('deleting target');
    };
    GameScreen.prototype.switchScreens = function () {
        console.log('switch to gamescreen');
        this.game.emptyScreen();
        this.game.showScreen(new EndScreen(this.game));
    };
    return GameScreen;
}());
var Playerone = (function () {
    function Playerone(p) {
        var _this = this;
        this.score = 0;
        this.downSpeed = 0;
        this.upSpeed = 0;
        this.rightSpeed = 0;
        this.leftSpeed = 0;
        this.gamescreen = p;
        this.playerone = document.createElement("playerone");
        var container = document.getElementsByTagName("container")[0];
        container.appendChild(this.playerone);
        this.upkey = 87;
        this.downkey = 83;
        this.leftkey = 65;
        this.rightkey = 68;
        this.x = 0;
        this.y = 200;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
    }
    Playerone.prototype.onKeyDown = function (e) {
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
    Playerone.prototype.onKeyUp = function (e) {
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
    Playerone.prototype.getRectangle = function () {
        return this.playerone.getBoundingClientRect();
    };
    Playerone.prototype.update = function () {
        var newY = this.y - this.upSpeed + this.downSpeed;
        var newX = this.x - this.leftSpeed + this.rightSpeed;
        if (newY > 0 && newY + 80 < window.innerHeight)
            this.y = newY;
        if (newX > 0 && newX + 80 < window.innerWidth)
            this.x = newX;
        this.playerone.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return Playerone;
}());
var PlayerTwo = (function () {
    function PlayerTwo(p) {
        var _this = this;
        this.score = 0;
        this.downSpeed = 0;
        this.upSpeed = 0;
        this.rightSpeed = 0;
        this.leftSpeed = 0;
        this.gamescreen = p;
        this.playertwo = document.createElement("playertwo");
        var container = document.getElementsByTagName("container")[0];
        container.appendChild(this.playertwo);
        this.upkey = 38;
        this.downkey = 40;
        this.leftkey = 37;
        this.rightkey = 39;
        this.x = 0;
        this.y = 400;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
    }
    PlayerTwo.prototype.onKeyDown = function (e) {
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
    PlayerTwo.prototype.onKeyUp = function (e) {
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
    PlayerTwo.prototype.getRectangle = function () {
        return this.playertwo.getBoundingClientRect();
    };
    PlayerTwo.prototype.update = function () {
        var newY = this.y - this.upSpeed + this.downSpeed;
        var newX = this.x - this.leftSpeed + this.rightSpeed;
        if (newY > 0 && newY + 80 < window.innerHeight)
            this.y = newY;
        if (newX > 0 && newX + 80 < window.innerWidth)
            this.x = newX;
        this.playertwo.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return PlayerTwo;
}());
var Target = (function () {
    function Target(p) {
        this.speedX = 0;
        this.speedY = 0;
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
        if (this.x - 40 > window.innerWidth || this.x < 0) {
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
        var container = document.getElementsByTagName("container")[0];
        container.appendChild(this.startbtn);
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