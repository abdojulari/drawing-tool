export class Pen {
    public points: any[];
    public strokeColor: string;
    public strokeSize: number;
    private p5: any;
  
    constructor(p5: any, points: any[], strokeColor: string, strokeSize: number) {
      this.p5 = p5;
      this.points = points;
      this.strokeColor = strokeColor;
      this.strokeSize = strokeSize;
    }
  
    public draw(p: any) {
      p.stroke(this.strokeColor);
      p.strokeWeight(this.strokeSize);
      p.beginShape(p.LINES);
      this.points.forEach(point => {
        p.vertex(point.x, point.y);
      });
      p.endShape(p.CLOSE);
    }
  }
  