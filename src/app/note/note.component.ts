import { 
  AfterViewInit, 
  Component, 
  ElementRef, 
  EventEmitter, 
  Output, 
  ViewChild 
} from '@angular/core';
import { Draggable } from  '@syncfusion/ej2-base';
import { 
  faClose,
  faMicrophone
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent  implements AfterViewInit{

  public recognition:any;
  public faClose = faClose;
  public faMicrophone = faMicrophone;

  @Output() dismiss = new EventEmitter();
  @Output() focusout = new EventEmitter();
  
  @ViewChild('ele',{static: false})element:any;
  
  constructor(private el:ElementRef) { 

    this.element = document.getElementById('mydiv')
    const {webkitSpeechRecognition} : any = <any>window;
    this.recognition = new webkitSpeechRecognition();
    this.recognition.onresult = (event: { results: { transcript: any; }[][]; })=> {
      this.el.nativeElement.querySelector(".content").innerText += event.results[0][0].transcript
      console.log(event.results[0][0].transcript) 
      document.getElementById('toolbar')?.focus();
    };
  }

  onDismiss(event: any){
    this.dismiss.emit(event);
  }
  
  onFocusOut(event: any){
    this.focusout.emit(event)
  }

  record(event: any) {
    this.recognition.start();
  }

 
    ngAfterViewInit() {
        let draggable:Draggable =
        new Draggable(this.element.nativeElement,{clone: false});
    }
 
}
