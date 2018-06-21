# Game Programmeren

## Speelbare game
<a href="https://yannickpost93.github.io/prog-game/">Link naar de speelbare game</a>

## Checklist
x De game heeft een startscherm en een eindscherm. </br>
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
### Encapsulation<br>
In mijn code zorg ik er voor dat de variabelen die niet ergens anders gebruikt hoeven te worden op private staan. Zie de voorbeeld code hieronder waar ik alle onderdelen van mijn game alleen maar in de class gamescreen gebruik.

```javascript
class GameScreen {
    private game:Game
    
    private playerone:Player
    private playertwo:Player

    private target:Target
    private scoreElement:Element
    private score:number = 0
    private scoreElement2:Element
    private score2:number = 0

    constructor(g:Game) {
    }
}
```

### Composition
In mijn code maak ik gebruik van composition. Je kunt bijvoorbeeld zien dat mijn gamescreen twee players en een target heeft.
```javascript
    this.playerone = new Player(this, 87,68,83,65, "playerone") // arrows
    this.playertwo = new Player(this, 38, 39, 40, 37, "playertwo")  // w a s d
    this.target = new Target(this)
```

### Inheritance
In deze game heb ik geen inheritance nodig gehad, omdat er geen classes waren die dingen nodig hadden van een andere class.

### Klassendiagram
![alt text](https://raw.githubusercontent.com/username/projectname/branch/path/to/img.png)



## Peer review
Een link naar de peer review die in week 6 is gedaan.

## Extra uitdaging
In deze game heb ik een multiplayer element toegevoegd. Mensen kunnen local tegen elkaar spelen door gebruik te maken van WASD of de pijltjestoetsen
