import { Display } from "./Display.js";
import { Player } from "./Player.js";
import { Rock } from "./Rock.js";
import { Hole } from "./Hole.js";
import { Direction } from "./Direction.js";
export class Game {
    constructor(width, height, scale) {
        this.width = width;
        this.height = height;
        this.display = new Display(width, height, scale);
        this.player = new Player(width / 2, height / 2);
        this.currentLevel = 1;
        this.initializeLevel();
    }
    initializeLevel() {
        Rock.clearAll();
        Hole.clearAll();
        const numberOfElements = this.currentLevel;
        for (let i = 0; i < numberOfElements; i++) {
            new Rock(this.getRand(), this.getRand());
            new Hole(this.getRand(), this.getRand());
        }
        this.display.updateLevel(this.currentLevel); // affichage du niveau
        this.display.draw(this);
    }
    getRand() {
        return Math.floor(Math.random() * this.width);
    }
    checkLevelCompletion() {
        const allHolesFilled = Hole.allHoles.every((hole) => hole.isFilled());
        if (allHolesFilled) {
            this.currentLevel++;
            if (this.currentLevel > 4) {
                console.log("You have completed all levels! Congratulations!");
                return;
            }
            console.log(`Level ${this.currentLevel}`);
            this.initializeLevel();
        }
    }
    getPlayer() {
        return this.player;
    }
    getRocks() {
        return Rock.allRocks;
    }
    getHoles() {
        return Hole.allHoles;
    }
    start() {
        this.display.draw(this);
        this.initialize();
    }
    initialize() {
        document.addEventListener("keydown", (event) => {
            let new_dir;
            switch (event.key) {
                case "ArrowUp":
                    new_dir = Direction.UP;
                    break;
                case "ArrowDown":
                    new_dir = Direction.DOWN;
                    break;
                case "ArrowLeft":
                    new_dir = Direction.LEFT;
                    break;
                case "ArrowRight":
                    new_dir = Direction.RIGHT;
                    break;
                default:
                    new_dir = null;
            }
            if (new_dir != null) {
                const holes = this.getHoles();
                const rocks = this.getRocks();
                const moved = this.player.move(new_dir, rocks, holes);
                if (moved) {
                    this.display.draw(this);
                    this.checkLevelCompletion();
                }
            }
            else {
                console.log("Wrong Key!!");
            }
        });
    }
}
