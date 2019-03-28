import { 
  Component, 
  OnInit, 
  HostListener, 
  ElementRef, 
  EventEmitter, 
  OnDestroy 
} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-draggable',
  templateUrl: './draggable.component.html',
  styleUrls: ['./draggable.component.scss']
})
export class DraggableComponent implements OnInit, OnDestroy {
  private onMouseUpEvent = new EventEmitter();
  private onMouseDownEvent = new EventEmitter();
  private onMouseMoveEvent = new EventEmitter();

  @HostListener("document:mouseup", ['$event'])
  onMouseUp(event) { this.onMouseUpEvent.emit(event); }

  @HostListener("mousedown", ['$event'])
  onMouseDown(event) { this.onMouseDownEvent.emit(event); }
  
  @HostListener("document:mousemove", ['$event']) 
  onMouseMove(event) { this.onMouseMoveEvent.emit(event); }

  constructor(public element: ElementRef) {}

  ngOnInit() {
    this.onMouseDownEvent
      .asObservable()
      .map((e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        return {
          left: (e.clientX - this.element.nativeElement.getBoundingClientRect().left),
          top: (e.clientY - this.element.nativeElement.getBoundingClientRect().top)
        }
      })
      .flatMap(offSet => {
        return this.onMouseMoveEvent
          .map((e: MouseEvent) => {
            return {
              left: e.clientX - offSet.left,
              top: e.clientY - offSet.top
            }
          })
          .takeUntil(this.onMouseUpEvent)
      })
      .subscribe(position => {
        this.element.nativeElement.style.left = position.left + 'px';
        this.element.nativeElement.style.top = position.top + 'px';
      });
  }

  ngOnDestroy() {
    this.onMouseDownEvent.unsubscribe();
  }
}
