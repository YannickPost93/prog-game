/// <reference path="ball.ts"/>

class Game {
   
    private balls: Ball[] = []

    constructor() {

        for (var i = 0; i < 15; i++) {
            this.balls.push(new Ball(this))
        }

        this.gameLoop()

        
                
    }
    
    private gameLoop():void{
        for (var b of this.balls) {
            b.update();
        }
        
        requestAnimationFrame(() => this.gameLoop())
    }
    
 

    public removeArrayItem(arrayitem: any) {
        console.log('removing item')
        for (let i = 0;i< this.balls.length ;i++) {

            if (this.balls[i] === arrayitem) {

                this.balls.splice(i, 1);

            }
        }
    }

}


window.addEventListener("load", () => new Game())