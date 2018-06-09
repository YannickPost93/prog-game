class StartScreen {

    private game : Game
    private startbtn : HTMLElement
    private controls : HTMLElement

    constructor(g:Game) {
        // console.log('startscreen made')
        this.game = g

        this.startbtn = document.createElement("startbtn")
        this.controls = document.createElement("controls")
        
        let container = document.getElementsByTagName("container")[0]
        container.appendChild(this.startbtn)
        container.appendChild(this.controls)
                
        this.startbtn.addEventListener("click", ()=> this.switchScreens())
    }

    public update() {
        //console.log('startscreen update')
        this.startbtn.innerHTML = "START GAME"

    }

    private switchScreens(){
        console.log('switch to gamescreen')
        this.game.emptyScreen()
        this.game.showScreen(new GameScreen(this.game))
    }
    
}
