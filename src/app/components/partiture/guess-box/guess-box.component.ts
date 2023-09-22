import {
  Component,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-guess-box',
  templateUrl: './guess-box.component.html',
  styleUrls: ['./guess-box.component.scss'],
})
export class GuessBoxComponent {
  @Output() byInputChange = new EventEmitter();
  @Output() byTypedNote = new EventEmitter();
  @ViewChild('guessNoteInput', { static: false })
  guessNoteInputField: ElementRef<HTMLInputElement> = {} as ElementRef;

  guessNoteValue: string = '';

  constructor() {
    setInterval(() => {
      if(this.guessNoteInputField.nativeElement){
        this.guessNoteInputField.nativeElement.focus();
      }
    }, 100);
  }

  onInputChange() {
    this.guessNoteInputField.nativeElement.value =
      this.guessNoteValue.toLocaleUpperCase();
    this.guessNoteInputField.nativeElement.focus();
    this.guessNoteInputField.nativeElement.select();
    this.checkNoteCallback();
    
  }

  checkNoteCallback() {
    this.guessNoteInputField.nativeElement.focus();
    this.guessNoteInputField.nativeElement.select();
    this.byTypedNote.emit(this.guessNoteValue.toLocaleUpperCase());
  }

  resetForm() {
    this.guessNoteInputField.nativeElement.value = '';
    this.guessNoteInputField.nativeElement.dispatchEvent(new Event('input'));
    this.guessNoteInputField.nativeElement.focus();
  }
}
