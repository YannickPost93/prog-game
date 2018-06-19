class EndScreen {

    private game : Game
    private restartbtn : HTMLElement
    
    private winnerElement: HTMLElement
    // public winner: string

    constructor(g:Game) {
        this.game = g
        //console.log(this.winner)
        this.restartbtn = document.createElement("startbtn")
        this.winnerElement = document.createElement('winnerElement')
        
        let container = document.getElementsByTagName("container")[0]
        container.appendChild(this.restartbtn)
        container.appendChild(this.winnerElement)
                
        this.restartbtn.addEventListener("click", ()=> this.switchScreens())

             
    }
    public update() { 
        this.restartbtn.innerHTML = "RESTART GAME"
        //this.winnerElement.innerHTML = this.winner

    }

    private switchScreens(){
        console.log('switch to gamescreen')
        this.game.emptyScreen()
        this.game.showScreen(new GameScreen(this.game))
    }
    
}
