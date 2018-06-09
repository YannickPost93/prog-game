class Game {
    private currentscreen : StartScreen | GameScreen | EndScreen

    constructor() {
        this.currentscreen = new StartScreen(this)
        this.gameLoop()            
    }

    private gameLoop():void{
        this.currentscreen.update()
        requestAnimationFrame(() => this.gameLoop())
    }

    public showScreen(screen : StartScreen | GameScreen | EndScreen ) {
        this.currentscreen = screen
    }

    public emptyScreen() {
        let container = document.getElementsByTagName("container")[0]
        container.innerHTML = ""
   
    }

    
}


window.addEventListener("load", () => new Game())