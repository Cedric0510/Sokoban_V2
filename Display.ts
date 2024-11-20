import Drawer from "./Drawer.js";
import { Game } from "./Game.js";

export class Display {
    private drawer: Drawer;

    constructor(width: number, height: number, scale: number = 10) {
        this.drawer = new Drawer(width, height, scale);
    }

    public updateLevel(level: number): void {
        const scoreDisplay = document.getElementById("score");
        if (scoreDisplay) {
            scoreDisplay.textContent = `${level}`;
        }
    }

    public draw(game: Game): void {
        this.drawer.clear();

        const player = game.getPlayer();
        this.drawer.drawRectangle(player.getX(), player.getY(), player.getColor());

        const rocks = game.getRocks();
        rocks.forEach((rock) => {
            this.drawer.drawRectangle(rock.getX(), rock.getY(), rock.getColor());
        });

        const holes = game.getHoles();
        holes.forEach((hole) => {
            this.drawer.drawCircle(hole.getX(), hole.getY(), hole.getColor());
        });
    }
}
