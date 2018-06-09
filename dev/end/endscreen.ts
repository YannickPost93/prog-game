class EndScreen {

    private game : Game
    private restartbtn : HTMLElement
    
    //private winner: String

    constructor(g:Game) {
        this.game = g
        //console.log(this.winner)
        this.restartbtn = document.createElement("startbtn")
        
        let container = document.getElementsByTagName("container")[0]
        container.appendChild(this.restartbtn)
                
        this.restartbtn.addEventListener("click", ()=> this.switchScreens())

             
    }
    public update() { 
        this.restartbtn.innerHTML = "RESTART GAME"

    }

    private switchScreens(){
        console.log('switch to gamescreen')
        this.game.emptyScreen()
        this.game.showScreen(new GameScreen(this.game))
    }
    
}
