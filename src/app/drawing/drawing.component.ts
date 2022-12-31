import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as p5 from 'p5';
import { Line, Pen, Rectangle, Square, Circle } from '../shapes';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-drawing',
  templateUrl: './drawing.component.html',
  styleUrls: ['./drawing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrawingComponent implements OnInit {
  private p5!: p5;
  private shapes: any[] = [];
  private selectedShape: any;
  public strokeColor = '#000000'; // default stroke color
  public strokeSize = 1; // default stroke size
  public notes: any = [];
  public recognition:any;
  public faAddress = faAddressBook
  @ViewChild('droppable',{static: false})element: any ;


  constructor(private el:ElementRef) {

    const local = localStorage.getItem('notes');
    this.notes = JSON.parse(local!) || [{ id: 0, content:'' }];

    const {webkitSpeechRecognition} : any = <any>window;
    this.recognition = new webkitSpeechRecognition();
    this.recognition.onresult = (event: { results: { transcript: any; }[][]; })=> {
      console.log(this.el.nativeElement.querySelectorAll(".content")[0]);
      this.el.nativeElement.querySelectorAll(".content")[0].innerText = event.results[0][0].transcript
      
    };
  }

  ngOnInit(): void {
    this.p5 = new p5((p: any) => {
      p.setup = () => {
        p.createCanvas(1100, 580).parent('canvas');
        p.rectMode(p.CENTER);
        p.color(255, 0, 0);
      };

      p.draw = () => {
        p.background(255);

        this.shapes.forEach((shape) => {
          if (!(shape instanceof Pen)) {
            shape.draw(p);
          } else {
            shape.draw(p);
          }
        });
      };

      p.mousePressed = () => {
        this.shapes.forEach((shape) => {
          if (shape instanceof Pen) {
            shape.points.push(p.mouseX, p.mouseY);
            this.selectedShape = shape;
          } else if (
            shape.contains(p.mouseX, p.mouseY) ||
            shape.orientation === 'vertical' ||
            shape.orientation === 'horizontal'
          ) {
            this.selectedShape = shape;
            this.selectedShape.strokeColor = this.strokeColor;
            this.selectedShape.strokeSize = this.strokeSize;
          }
        });
      };

      p.mouseDragged = () => {
        if (this.selectedShape) {
          if (this.selectedShape instanceof Pen) {
            this.selectedShape.points.push({ x: p.mouseX, y: p.mouseY });
          } else if (this.selectedShape.orientation === 'horizontal') {
            this.selectedShape.x = p.mouseX;
            this.selectedShape.y = this.selectedShape.y;
          } else if (this.selectedShape.orientation === 'vertical') {
            this.selectedShape.x = this.selectedShape.x;
            this.selectedShape.y = p.mouseY;
          } else {
            this.selectedShape.x = p.mouseX;
            this.selectedShape.y = p.mouseY;
          }
        }
      };

      p.mouseMoved = () => {
        let overShape = false;

        if (!(this.shapes instanceof Pen)) {
          this.shapes.forEach((shape) => {
            if (shape.contains(p.mouseX, p.mouseY)) {
              overShape = true;
            }
          });
        }

        if (overShape) {
          p.cursor(p.HAND);
        } else {
          p.cursor(p.ARROW);
        }
      };

      p.mouseReleased = () => {
        this.selectedShape = null;
        if (this.selectedShape instanceof Pen && !p.mouseIsPressed) {
          this.shapes.push(this.selectedShape);
          console.log(this.shapes);
        }
      };
    });
  }

  addRectangle() {
    this.shapes.push(
      new Rectangle(
        this.p5,
        100,
        50,
        100,
        50,
        this.strokeColor,
        this.strokeSize
      )
    );
  }

  addCircle() {
    this.shapes.push(
      new Circle(this.p5, 50, 50, 25, this.strokeColor, this.strokeSize)
    );
  }

  addSquare() {
    this.shapes.push(
      new Square(this.p5, 50, 50, 50, this.strokeColor, this.strokeSize)
    );
  }

  addVerticalLine() {
    this.shapes.push(
      new Line(
        this.p5,
        50,
        50,
        50,
        100,
        'vertical',
        this.strokeColor,
        this.strokeSize
      )
    );
  }

  addHorizontalLine() {
    this.shapes.push(
      new Line(
        this.p5,
        50,
        50,
        100,
        50,
        'horizontal',
        this.strokeColor,
        this.strokeSize
      )
    );
  }

  addPen() {
    this.shapes.push(new Pen(this.p5, [], this.strokeColor, this.strokeSize));
  }

  // stickyNote 

  updateAllNotes() {
    let notes = document.querySelectorAll('app-note');

    notes.forEach((note: any, index: number) =>{
        console.log(note.querySelector('.content').innerHTML)
        this.notes[note.id].content = note.querySelector('.content').innerHTML;

    });
    localStorage.setItem('notes', JSON.stringify(this.notes));

  }

  addNote () {
    this.notes.push({ id: this.notes.length + 1,content:'' });
    // sort the array
    this.notes= this.notes.sort((a: { id: number; },b: { id: number; })=>{ return b.id-a.id});
    localStorage.setItem('notes', JSON.stringify(this.notes));
  };

  saveNote(event: any){
    const id = event.srcElement.parentElement.parentElement.getAttribute('id');
    const content = event.target.innerText;
    event.target.innerText = content;
    const json = {
      'id':id,
      'content':content
    }
    this.updateNote(json);
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }
  
  updateNote(newValue: { id: any; content: any; }){
    this.notes.forEach((note: { id: any; }, index: string | number)=>{
      if(note.id== newValue.id) {
        this.notes[index].content = newValue.content;
      }
    });
  }
  
  deleteNote(event: any){
     const id = event.srcElement.parentElement.parentElement.parentElement.getAttribute('id');
     this.notes.forEach((note: any, index: any)=>{
      if(note.id== id) {
        this.notes.splice(index,1);
        localStorage.setItem('notes', JSON.stringify(this.notes));
        return;
      }
    });
  }

   record(event: any) {
    this.recognition.start();
    this.addNote();
  }

  ngAfterViewInit() {
    //let droppable: Droppable = new Droppable(document.getElementById('droppable')!);
 }
}
