import { Display } from "./Display.js";
import { Player } from "./Player.js";
import { Rock } from "./Rock.js";
import { Hole } from "./Hole.js";
import { Direction } from "./Direction.js";

export class Game {
    private width: number;
    private height: number;
    private display: Display;
    private player: Player;
    private currentLevel: number;

    constructor(width: number, height: number, scale: number) {
        this.width = width;
        this.height = height;
        this.display = new Display(width, height, scale);
        this.player = new Player(width / 2, height / 2);
        this.currentLevel = 1;
        this.initializeLevel();
    }

    private initializeLevel(): void {
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

    private getRand(): number {
        return Math.floor(Math.random() * this.width);
    }

    private checkLevelCompletion(): void {
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

    public getPlayer(): Player {
        return this.player;
    }

    public getRocks(): Rock[] {
        return Rock.allRocks;
    }

    public getHoles(): Hole[] {
        return Hole.allHoles;
    }

    public start(): void {
        this.display.draw(this);
        this.initialize();
    }

    public initialize(): void {
        document.addEventListener("keydown", (event) => {
            let new_dir: Direction | null;
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
            } else {
                console.log("Wrong Key!!");
            }
        });
    }
}
