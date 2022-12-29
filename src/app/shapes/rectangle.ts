export class Rectangle {
    private p: any;
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public strokeColor: string;
    public strokeSize: number;
  
  
    constructor(p: any, x: number, y: number, width: number, height: number, strokeColor: string, strokeSize: number ) {
      this.p = p;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.strokeColor = strokeColor;
      this.strokeSize = strokeSize;
  
    }
  
    draw(p: any) {
      p.stroke(this.strokeColor);
      p.strokeWeight(this.strokeSize)
      p.rect(this.x, this.y, this.width, this.height);
    }
  
    contains(x: number, y: number) {
      return (x > this.x - this.width/2 && x < this.x + this.width/2) &&
             (y > this.y - this.height/2 && y < this.y + this.height/2);
    }
  }