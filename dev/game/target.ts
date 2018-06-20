class Target {
    private gamescreen:GameScreen

    private x : number
    private y : number

    private speedX: number = 0
    private speedY: number = 0
    
    private target : HTMLElement
    
    constructor(p:GameScreen) {

        console.log('making target')
      this.gamescreen = p

      this.target = document.createElement("target")
      let container = document.getElementsByTagName("container")[0]
      container.appendChild(this.target)

      this.x = Math.random() * window.innerWidth
      this.y = Math.random() * window.innerHeight

      this.speedX = Math.round(Math.random() * 20)+10
      this.speedY = Math.round(Math.random() * 10)-5

      //if(Math.random()>0.5) this.speedX *= -1
      //this.target.style.transform = `translate(${this.x}px, ${this.y}px)` 

    }
    
    public update() : void {
        this.x += this.speedX
        this.y += this.speedY
        
        if( this.y + 40 > window.innerHeight || this.y < 0) { 
            this.speedY *= -1
        }
        
        if (this.x + 40 > window.innerWidth || this.x < 0 ) { 
            this.speedX *= -1
        } 
                        
        this.target.style.transform = `translate(${this.x}px, ${this.y}px)` 

    }

    public deleteTarget(){
        console.log('deleting target')
        this.target.remove()
    }

    public getRectangle() {
        return this.target.getBoundingClientRect()
    }
    
}