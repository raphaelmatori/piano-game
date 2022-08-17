import { Component, ElementRef, ViewChild } from '@angular/core';
import { clefGDataset } from './dataset/clef-g-dataset';
import { clefFDataset } from './dataset/clef-f-dataset';
import { GuessBoxComponent } from './guess-box/guess-box.component';

@Component({
  selector: 'app-partiture',
  templateUrl: './partiture.component.html',
  styleUrls: ['./partiture.component.scss'],
})
export class PartitureComponent {
  @ViewChild(GuessBoxComponent) child: GuessBoxComponent | undefined;

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
  currentclefDataset = clefGDataset;
  currentNote = clefGDataset[0];
  clefType = this.currentclef;
  validation = false;
  shouldDisplayMessage = false;
  isClefRandom = false;

  constructor() {
    this.applyFilter();
  }

  onSelectClef(clefType: string) {
    this.changeClef(clefType);
    this.newRandomNote();
  }

  hideMessage() {
    this.shouldDisplayMessage = false;
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

  checkNote(note: any) {
    console.log(note, this.currentNote.symbol);
    this.validation = note === this.currentNote.symbol;
    this.shouldDisplayMessage = true;

    if (this.validation === true) {
      if (this.newNoteSetTimeout) {
        clearTimeout(this.newNoteSetTimeout);
      }

      this.newNoteSetTimeout = setTimeout(() => {
        this.child?.resetForm();
        this.newRandomNote();
      }, 500);
    }
  }

  newRandomNote() {
    this.shouldDisplayMessage = false;

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
