import { Point } from "./Point.js";
export class Hole extends Point {
    constructor(x, y) {
        super(x, y, "black");
        this.filled = false;
        Hole.allHoles.push(this);
    }
    isFilled() {
        return this.filled;
    }
    fill() {
        this.filled = true;
        this.setColor("white");
    }
    static clearAll() {
        Hole.allHoles = [];
    }
}
Hole.allHoles = [];
