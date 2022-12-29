export class Line {
    private p: any;
    public x1: number;
    public y1: number;
    public x2: number;
    public y2: number;
    public orientation: string;
    public strokeColor: string;
    public strokeSize: number;
  
    constructor(p: any, x1: number, y1: number, x2: number, y2: number, orientation: string, strokeColor: string, strokeSize: number) {
      this.p = p;
      this.x1 = x1;
      this.y1 = y1;
      this.x2 = x2;
      this.y2 = y2;
      this.orientation = orientation;
      this.strokeColor = strokeColor;
      this.strokeSize = strokeSize;
    }
  
    draw(p: any) {
      p.stroke(this.strokeColor);
      p.strokeWeight(this.strokeSize);
      p.line(this.x1, this.y1, this.x2, this.y2);
    }
  
    contains(x: number, y: number) {
  
      if (this.orientation === 'vertical') {
        return  (x > this.x1 && x < this.x2) && (y > Math.min(this.y1, this.y2) && y < Math.max(this.y1, this.y2));
      } else if (this.orientation === 'horizontal') {
        return (y > this.y1 && y < this.y2) && (x > Math.min(this.x1, this.x2) && x < Math.max(this.x1, this.x2));
      }
      return;
    }
  }