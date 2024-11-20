import { Point } from "./Point.js";

export class Hole extends Point {
    public static allHoles: Hole[] = []; 
    private filled: boolean = false; 

    constructor(x: number, y: number) {
        super(x, y, "black");
        Hole.allHoles.push(this); 
    }

    public isFilled(): boolean {
        return this.filled;
    }

    public fill(): void {
        this.filled = true;
        this.setColor("white"); 
    }

    public static clearAll(): void {
        Hole.allHoles = []; 
    }
}
