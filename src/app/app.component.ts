import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'moveable-box-generator';
  boxes: any = [];
  selectedBox: any;
  boxFocusedID: number;
  isBoxFocused: boolean;
  pixelCounter: number = 50;
  isToggleOn: boolean = true;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.KeyListener();
  }

  onToggleKeyListen(_ev: boolean) {
    this.isToggleOn = _ev;
  }

  KeyListener() {
    let moveableBox = this;

    this.document.addEventListener('keydown', function (_ev) {
      let KeyPressed = _ev.key ? _ev.key : null;

      let isDelete = KeyPressed === 'Delete' && moveableBox.isBoxFocused;
      let isLeft = KeyPressed === 'ArrowLeft' && moveableBox.isBoxFocused;
      let isRight = KeyPressed === 'ArrowRight' && moveableBox.isBoxFocused;
      let isDown = KeyPressed === 'ArrowDown' && moveableBox.isBoxFocused;
      let isUp = KeyPressed === 'ArrowUp' && moveableBox.isBoxFocused;

      switch(moveableBox.isToggleOn) {
        case isDelete: { 
          moveableBox.onDeleteBox();
          break; 
        }
        case isLeft: { 
          moveableBox.boxLeft();
          break; 
        }
        case isRight: { 
          moveableBox.boxRight();
          break; 
        }
        case isUp: { 
          moveableBox.boxUp();
          break; 
        }
        case isDown: { 
          moveableBox.boxDown();
          break; 
        }
      }
    });
  }

  boxRight() {
    let selectedStyle = this.selectedBox?.style;
    let pixels = selectedStyle.left?.split('px')[0];
    selectedStyle.left = `${Number(pixels) + this.pixelCounter}px`;
    let SelectedRight = selectedStyle.right.split('px')[0];
    selectedStyle.right = `${Number(SelectedRight) - this.pixelCounter}px`;
  }

  boxDown() {
    let selectedStyle = this.selectedBox?.style;
    let pixels = selectedStyle.top?.split('px')[0];
    selectedStyle.top = `${Number(pixels) + this.pixelCounter}px`;
    let SelectedBottom = selectedStyle.bottom.split('px')[0];
    selectedStyle.bottom = `${Number(SelectedBottom) - this.pixelCounter}px`;
  }

  boxLeft() {
    let selectedStyle = this.selectedBox?.style;
    let pixels = selectedStyle.right?.split('px')[0];
    selectedStyle.right = `${Number(pixels) + this.pixelCounter}px`;
    let SelectedLeft = selectedStyle.left?.split('px')[0];
    selectedStyle.left = `${Number(SelectedLeft) - this.pixelCounter}px`;
  }

  boxUp() {
    let selectedStyle = this.selectedBox?.style;
    let pixels = selectedStyle.bottom?.split('px')[0];
    selectedStyle.bottom = `${Number(pixels) + this.pixelCounter}px`;
    let SelectedTop = selectedStyle.top.split('px')[0];
    selectedStyle.top = `${Number(SelectedTop) - this.pixelCounter}px`;
  }
 

  onDeleteBox() {
    this.selectedBox.remove();
  }

  clear() {
    this.boxes.length = 0;
  }

  box(id: number) {
    this.boxFocusedID = id;
    this.isBoxFocused = true;
    let FocusedBox = document.getElementById(`${id}`);
    this.selectedBox = FocusedBox;
  }

  addBox() {
    try {
      let id = this.onGenerateID();
      console.log("roja",id);
      this.boxes.push(id);
    } catch (e) {
      console.log('Error catched in Addbox', e);
    }
  }

  onGenerateID() {
    return Math.round(Date.now() + Math.random());
  }
}
