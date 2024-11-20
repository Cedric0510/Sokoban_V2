import { Point } from "./Point.js";

export class Rock extends Point {
    public static allRocks: Rock[] = []; 
    private locked: boolean = false; 

    constructor(x: number, y: number) {
        super(x, y, "grey");
        Rock.allRocks.push(this); 
    }

    public isLocked(): boolean {
        return this.locked;
    }

    public lock(): void {
        this.locked = true;
        this.setColor("white"); 
    }

    public static clearAll(): void {
        Rock.allRocks = [];
    }
}
