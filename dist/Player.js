import { Direction } from "./Direction.js";
export class Player {
    constructor(x, y, color = "green") {
        this.x = Math.floor(x);
        this.y = Math.floor(y);
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
    move(direction, rocks, holes) {
        let newX = this.x;
        let newY = this.y;
        switch (direction) {
            case Direction.UP:
                newY--;
                break;
            case Direction.DOWN:
                newY++;
                break;
            case Direction.LEFT:
                newX--;
                break;
            case Direction.RIGHT:
                newX++;
                break;
        }
        if (holes.some((hole) => hole.getX() === newX && hole.getY() === newY && !hole.isFilled())) {
            console.log("Player cannot enter the hole!");
            return false;
        }
        for (const rock of rocks) {
            if (newX === rock.getX() && newY === rock.getY()) {
                if (rock.isLocked()) {
                    console.log("Rock is locked in the hole!");
                    return false;
                }
                let rockNewX = rock.getX();
                let rockNewY = rock.getY();
                switch (direction) {
                    case Direction.UP:
                        rockNewY--;
                        break;
                    case Direction.DOWN:
                        rockNewY++;
                        break;
                    case Direction.LEFT:
                        rockNewX--;
                        break;
                    case Direction.RIGHT:
                        rockNewX++;
                        break;
                }
                const targetHole = holes.find((hole) => hole.getX() === rockNewX && hole.getY() === rockNewY);
                if (targetHole && !targetHole.isFilled()) {
                    targetHole.fill();
                    rock.lock();
                    rock.setX(rockNewX);
                    rock.setY(rockNewY);
                    break;
                }
                if (rocks.some((r) => r !== rock && r.getX() === rockNewX && r.getY() === rockNewY) ||
                    rockNewX < 0 ||
                    rockNewY < 0) {
                    return false;
                }
                rock.setX(rockNewX);
                rock.setY(rockNewY);
                break;
            }
        }
        this.x = newX;
        this.y = newY;
        return true;
    }
}
