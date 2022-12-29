import { Component, Input } from '@angular/core';
import { DrawingComponent } from '../drawing/drawing.component';
import { 
  faPenToSquare, 
  faRulerHorizontal, 
  faRulerVertical, 
  faSquare, 
  faCircle, 
  faSquareFull,
  faRectangleXmark
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-toolbox',
  templateUrl: './tool-box.component.html',
  styleUrls: ['./tool-box.component.scss']
})
export class ToolBoxComponent {
  @Input() drawing!: DrawingComponent;
  
  faPen = faPenToSquare;
  faCircle = faCircle;
  faVLine = faRulerVertical;
  faHline = faRulerHorizontal;
  faSquare = faSquareFull;
  faRec = faRectangleXmark;
  
  addRectangle() {
    this.drawing.addRectangle();
  }

  addCircle() {
    this.drawing.addCircle();
  }

  addSquare() {
    this.drawing.addSquare();
  }

  addVerticalLine() {
    this.drawing.addVerticalLine();
  }

  addHorizontalLine() {
    this.drawing.addHorizontalLine();
  }

  addPen() {
    this.drawing.addPen()
  }
}
