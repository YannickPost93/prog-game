/// <reference path="paddle.ts"/>

class Ball {
    
    private div : HTMLElement
    game : Game
    
    private x : number = 0
    private y: number = 0
    
    private speedX: number = 0
    private speedY: number = 0
    
    constructor(g:Game) {

        this.game = g
        this.div = document.createElement("ball")
        this.div.addEventListener('mousedown', () => this.removeItem())

        document.body.appendChild(this.div)

        this.x = (Math.random() * (window.innerWidth/2)) + (window.innerWidth/4)
        this.y = (Math.random() * (window.innerHeight/2)) + (window.innerHeight/4)
        
        this.speedX = Math.round(Math.random() * 3)+1
        this.speedY = Math.round(Math.random() * 6)-3

        if(Math.random()>0.5) this.speedX *= -1

    }
    
    public update() : void {
        this.x += this.speedX
        this.y += this.speedY
        
        if( this.y + 40 > window.innerHeight || this.y < 0) { 
            this.speedY *= -1
        }
        
        if (this.x - 40 > window.innerWidth || this.x < 0 ) { 
            this.speedX *= -1
        } 
                        
        this.div.style.transform = `translate(${this.x}px, ${this.y}px)` 
    }

    public removeItem() {
        console.log('remove')
        this.div.remove()

        this.game.removeArrayItem(this)
    }
    
}