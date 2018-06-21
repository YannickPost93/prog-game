# Game Programmeren

## Speelbare game
<a href="https://yannickpost93.github.io/prog-game/">Link naar de speelbare game</a>

## Checklist
x De game heeft een startscherm en een eindscherm.
x Er zijn geen bugs.

## Toelichting OOP
Ik heb classes gebruikt om mijn game werkend te krijgen. Hieronder zie je bijvoorbeeld de class van het startscherm, waarin alle onderdelen aangemaakt worden die op het scherm te zien moeten zijn. 

```javascript
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
```

## Classes
Encapsulation
Composition
Inheritance
Klassendiagram
Een klassendiagram van de game.

## Peer review
Een link naar de peer review die in week 6 is gedaan.

## Extra uitdaging
In deze game heb ik een multiplayer element toegevoegd. Mensen kunnen local tegen elkaar spelen door gebruik te maken van WASD of de pijltjestoetsen
