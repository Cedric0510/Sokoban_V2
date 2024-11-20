export class Point {
    constructor(x, y, color = '') {
        this.x = x;
        this.y = y;
        this.color = color;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    getColor() {
        return this.color;
    }
    setX(newX) {
        this.x = newX;
    }
    setY(newY) {
        this.y = newY;
    }
    setColor(color) {
        this.color = color;
    }
    touch(other_point) {
        if (other_point == this)
            return false;
        return this.x == other_point.getX() && this.y == other_point.getY();
    }
}
