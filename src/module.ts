export function square(a: number) {
    return a*a;
}

export class Point {
   public x: number;
   public y: number;

   constructor(x: number, y: number) {
       this.x = x;
       this.y = y;
   }
}

export class Line {
    public start: Point;
    public end: Point;

    constructor(start: Point, end: Point) {
        this.start = start;
        this.end = end;
    }

    public getLength() {
        return Math.sqrt(square(this.start.x - this.end.x) + square(this.start.y - this.end.y));
    }
}