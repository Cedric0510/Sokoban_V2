import { Point } from "./Point.js";
export class Rock extends Point {
    constructor(x, y) {
        super(x, y, "grey");
        this.locked = false;
        Rock.allRocks.push(this);
    }
    isLocked() {
        return this.locked;
    }
    lock() {
        this.locked = true;
        this.setColor("white");
    }
    static clearAll() {
        Rock.allRocks = [];
    }
}
Rock.allRocks = [];
