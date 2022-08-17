import { Component, ElementRef, ViewChild } from '@angular/core';
import { clefGDataset } from './dataset/clef-g-dataset';
import { clefFDataset } from './dataset/clef-f-dataset';

@Component({
  selector: 'app-partiture',
  templateUrl: './partiture.component.html',
  styleUrls: ['./partiture.component.scss'],
})
export class PartitureComponent {
  @ViewChild('guessNoteInput', { static: false })
  guessNoteInputField: ElementRef<HTMLInputElement> = {} as ElementRef;
  newNoteSetTimeout: ReturnType<typeof setTimeout> | undefined;
  checkboxNotes = [
    { value: 'A', checked: true },
    { value: 'B', checked: true },
    { value: 'C', checked: true },
    { value: 'D', checked: true },
    { value: 'E', checked: true },
    { value: 'F', checked: true },
    { value: 'G', checked: true },
  ];

  currentclef = 'G';
  guessNoteValue: string = '';
  currentclefDataset = clefGDataset;
  currentNote = clefGDataset[0];
  clefType = this.currentclef;
  validation = false;
  displayMessage = false;
  isClefRandom = false;

  constructor() {
    this.applyFilter();
  }

  onSelectClef(clefType: string) {
    this.changeClef(clefType);
    this.newRandomNote();
  }

  private changeClef(clefType: string) {
    this.isClefRandom = false;
    if (clefType === 'R') {
      // Random
      this.isClefRandom = true;
      clefType = 'G';
      if (Math.random() > 0.5) {
        clefType = 'F';
      }
    }

    this.clefType = clefType;

    if (clefType === 'G') {
      this.currentclef = 'G';
      this.currentclefDataset = clefGDataset;
    } else {
      this.currentclef = 'F';
      this.currentclefDataset = clefFDataset;
    }
    this.applyFilter();
  }

  onInputChange() {
    this.displayMessage = false;
  }

  applyFilter() {
    let auxDataset = clefFDataset;

    if (this.currentclef === 'G') {
      auxDataset = clefGDataset;
    }

    let resultDataset: any = [];

    const displayNotes = this.checkboxNotes.filter(
      (element) => element.checked
    );

    displayNotes.forEach((element) => {
      resultDataset.push(
        ...auxDataset.filter((e: any) => e.symbol === element.value)
      );
    });

    this.currentclefDataset = resultDataset;
  }

  checkNote() {
    this.validation =
      this.guessNoteValue.toLocaleUpperCase() === this.currentNote.symbol;
    this.displayMessage = true;
    this.guessNoteInputField.nativeElement.focus();
    this.guessNoteInputField.nativeElement.select();

    if (this.validation === true) {
      if (this.newNoteSetTimeout) {
        clearTimeout(this.newNoteSetTimeout);
      }

      this.newNoteSetTimeout = setTimeout(() => {
        this.guessNoteInputField.nativeElement.value = '';
        this.newRandomNote();
      }, 2000);
    }
  }

  newRandomNote() {
    this.displayMessage = false;

    if (this.isClefRandom) {
      this.changeClef('R');
    }

    this.currentNote =
      this.currentclefDataset[
        Math.floor(Math.random() * this.currentclefDataset.length)
      ];
  }

  onFilterChange(value: string) {
    let findNote = this.checkboxNotes.find(
      (element) => element.value === value
    );
    findNote ? (findNote.checked = !findNote?.checked) : null;
    this.applyFilter();
  }
}
