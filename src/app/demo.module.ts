import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DemoComponent } from './demo.component';
import { DraggableModule } from './draggable/draggable.module';
import { DraggableComponent } from './draggable/draggable.component';

@NgModule({
  declarations: [
    DemoComponent
  ],
  imports: [
    BrowserModule,
    DraggableModule
  ],
  providers: [],
  bootstrap: [DemoComponent]
})
export class DemoModule { }
