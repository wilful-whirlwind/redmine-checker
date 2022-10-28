import {Line, Point, square} from "./module";

console.log(square(2));

const p1: Point = new Point(0,0);
const p2: Point = new Point(3,4);
const l1: Line = new Line(p1, p2);

console.log(l1.getLength());
