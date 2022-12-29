import * as p5 from "p5";

export class Circle {
    private p: any;
    public x: number;
    public y: number;
    public radius: number;
    public strokeColor: string;
    public strokeSize: number;
  
    constructor(p: any, x: number, y: number, radius: number,  strokeColor: string, strokeSize: number) {
      this.p = p;
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.strokeColor = strokeColor;
      this.strokeSize = strokeSize;
      
    }
  
    draw(p: any) {
      p.stroke(this.strokeColor);
      p.strokeWeight(this.strokeSize);
      p.ellipse(this.x, this.y, this.radius*2, this.radius*2);
    }
  
    contains(x: number, y: number) {
      const d = p5.Vector.dist(this.p.createVector(x, y), this.p.createVector(this.x, this.y));
      return d < this.radius;
    }
  }
  