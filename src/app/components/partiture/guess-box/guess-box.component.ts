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

  onInputChange() {
    this.byInputChange.emit();
    this.guessNoteInputField.nativeElement.value =
      this.guessNoteValue.toLocaleUpperCase();
    this.guessNoteInputField.nativeElement.focus();
    this.guessNoteInputField.nativeElement.select();
  }

  checkNoteCallback() {
    this.byTypedNote.emit(this.guessNoteValue.toLocaleUpperCase());
    this.guessNoteInputField.nativeElement.focus();
    this.guessNoteInputField.nativeElement.select();
  }

  resetForm() {
    this.guessNoteInputField.nativeElement.value = '';
    this.guessNoteInputField.nativeElement.dispatchEvent(new Event('input'));
    this.guessNoteInputField.nativeElement.focus();
  }
}
