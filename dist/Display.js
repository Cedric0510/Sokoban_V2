import Drawer from "./Drawer.js";
export class Display {
    constructor(width, height, scale = 10) {
        this.drawer = new Drawer(width, height, scale);
    }
    updateLevel(level) {
        const scoreDisplay = document.getElementById("score");
        if (scoreDisplay) {
            scoreDisplay.textContent = `${level}`;
        }
    }
    draw(game) {
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
