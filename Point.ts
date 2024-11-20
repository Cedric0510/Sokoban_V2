export class Point{
    protected x: number;
    protected y: number;
    protected color : string;

    constructor(x:number,y:number,color:string=''){
        this.x = x;
        this.y = y;
        this.color = color;
    }

    public getX():number{
        return this.x;
    }

    public getY():number{
        return this.y;
    }

    public getColor():string{
        return this.color;
    }

    public setX(newX:number){
         this.x = newX
    }

    public setY(newY:number){
        this.y = newY
    }

    public setColor(color: string): void {
        this.color = color;
    }

    public touch(other_point:Point):boolean{
        if(other_point == this) return false;
        return this.x==other_point.getX() && this.y == other_point.getY();
    }
}