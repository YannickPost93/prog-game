class GameScreen {
    private game:Game
    
    private playerone:Player
   private playertwo:Player

    private target:Target
    private scoreElement:Element
    private score:number = 0
    private scoreElement2:Element
    private score2:number = 0
    //public winner: String

    constructor(g:Game) {
        this.game = g
        this.playerone = new Player(this, 87,68,83,65, "playerone") // arrows
        this.playertwo = new Player(this, 38, 39, 40, 37, "playertwo")  // w a s d
        this.target = new Target(this)

        this.scoreElement = document.createElement("scoreElement")
        this.scoreElement2 = document.createElement("scoreElement2")
        //this.scoreElement = document.getElementsByTagName('ScoreElement')[0]
        let container = document.getElementsByTagName('container')[0]
        container.appendChild(this.scoreElement)
        container.appendChild(this.scoreElement2)
        
        this.gameLoop()
    }
    
    private gameLoop(){
       
            let hit = this.checkCollision(this.playerone.getRectangle(), this.target.getRectangle())
            if(hit){
                console.log('hit')
                this.target.deleteTarget()
                this.target = new Target(this)
                
                this.score++
                this.scoreElement.innerHTML = "Score player 1: "+ this.score
            }

            let hit2 = this.checkCollision(this.playertwo.getRectangle(), this.target.getRectangle())
            if(hit2){
                console.log('hit2')
                this.target.deleteTarget()
                this.target = new Target(this)
                
                this.score2++
                this.scoreElement2.innerHTML = "Score player 2: "+ this.score2
            }

            

            if(this.score == 5){
                this.emptyScreen()
                this.switchScreens()
                console.log('p1 wins')
                
            }

            if(this.score2 == 5){
                this.emptyScreen()
                this.switchScreens()
                console.log('p2 wins')
                
            }
            
        

        this.playerone.update()
        this.playertwo.update()
        this.target.update()


        requestAnimationFrame(()=>this.gameLoop())
    }

    private checkCollision(a: ClientRect, b: ClientRect) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
    }

    public update():void {
    }


    private switchScreens(){
        console.log('switch to endscreen')
        
        this.game.showScreen(new EndScreen(this.game))
    }

    public emptyScreen(){
        this.target.deleteTarget()
        console.log('emptyScreen')
        let container = document.getElementsByTagName("container")[0]
        container.innerHTML = ""
        
    }
    
}
