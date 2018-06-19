class Player {
    
    private div: HTMLElement
    private playerone: Player
    private playertwo: Player
    private gamescreen:GameScreen
    
    private x: number
    private y: number

    private score: number = 0

    private downkey: number
    private upkey: number
    private rightkey: number
    private leftkey: number
    
    private downSpeed: number = 0
    private upSpeed: number = 0
    private rightSpeed: number = 0
    private leftSpeed: number = 0

    constructor(p:GameScreen, up:number,right:number,down:number,left:number, cls:string) {
        this.gamescreen = p
        
        this.div = document.createElement("player") 
        this.div.classList.add(cls) // skin
        console.log(cls);
        
        let container = document.getElementsByTagName("container")[0]
        container.appendChild(this.div)

        this.upkey = up
        this.rightkey = right
        this.downkey = down
        this.leftkey = left


        this.x = 0
        this.y = 200

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))

    }

    private onKeyDown(e: KeyboardEvent): void {
        switch (e.keyCode) {    
            case this.upkey:
                this.upSpeed = 10
                break
            case this.downkey:
                this.downSpeed = 10
                break
            case this.leftkey:
                this.leftSpeed = 10
                break
            case this.rightkey:
                this.rightSpeed = 10
                break
        }
    }

    private onKeyUp(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case this.upkey:
                this.upSpeed = 0
                break
            case this.downkey:
                this.downSpeed = 0
                break
            case this.leftkey:
                this.leftSpeed = 0
                break
            case this.rightkey:
                this.rightSpeed = 0
                break
        }
    }

    public getRectangle() {
       return this.div.getBoundingClientRect()
    }

    
    
    public update() : void {
        let newY = this.y - this.upSpeed + this.downSpeed
        let newX = this.x - this.leftSpeed + this.rightSpeed

        // check of de paddle binnen beeld blijft
        if (newY > 0 && newY + 80 < window.innerHeight) this.y = newY
        if (newX > 0 && newX + 80 < window.innerWidth) this.x = newX

        this.div.style.transform = `translate(${this.x}px, ${this.y}px)`
    }
    
}

// class PlayerOne extends Player{

//     constructor(){
    

//         this.upkey = 87
//         this.downkey = 83
//         this.leftkey = 65
//         this.rightkey = 68

//         this.playerone = document.createElement("playerone") 
//         let container = document.getElementsByTagName("container")[0]
//         container.appendChild(this.playerone)
//     }

// }

// class PlayerTwo extends Player {
    
//     constructor(){
//         super();

//         this.upkey = 38
//         this.downkey = 40
//         this.leftkey = 37
//         this.rightkey = 39

//         this.playertwo = document.createElement("playertwo") 
//         let container = document.getElementsByTagName("container")[0]
//         container.appendChild(this.playertwo)
//     }
// }