export class Square {
    private p: any;
    public x: number;
    public y: number;
    public size: number;
    public strokeColor: string;
    public strokeSize: number;
  
    constructor(p: any, x: number, y: number, size: number, strokeColor: string, strokeSize: number) {
      this.p = p;
      this.x = x;
      this.y = y;
      this.size = size;
      this.strokeColor = strokeColor;
      this.strokeSize = strokeSize;
    }
  
    draw(p: any) {
      p.stroke(this.strokeColor);
      p.strokeWeight(this.strokeSize);
      p.rect(this.x, this.y, this.size, this.size);
    }
  
    contains(x: number, y: number) {
      return (x > this.x - this.size/2 && x < this.x + this.size/2) &&
             (y > this.y - this.size/2 && y < this.y + this.size/2);
    }
  }
  