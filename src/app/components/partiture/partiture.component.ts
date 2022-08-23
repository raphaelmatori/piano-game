import { Component, ElementRef, ViewChild } from '@angular/core';
import { clefGDataset } from './dataset/clef-g-dataset';
import { clefFDataset } from './dataset/clef-f-dataset';
import { ClefTypes } from './../../models/clef-types-enum';
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

  clefTypeSelected = ClefTypes.RANDOM;
  currentDiplayedClef = ClefTypes.SOL;
  currentClefDataset = clefGDataset;
  currentNote = clefGDataset[0];
  validation = false;
  shouldDisplayMessage = false;
  isAtLeastOneNoteSelected = true;

  constructor() {
    this.changeClef(ClefTypes.RANDOM);
    this.applyFilter();
  }

  changeClefCallback(clefType: ClefTypes) {
    this.clefTypeSelected = clefType;
    this.changeClef(clefType);
    this.newRandomNote();
  }

  hideMessageCallback() {
    this.shouldDisplayMessage = false;
  }

  private changeClef(clefType: ClefTypes) {
    if (clefType === ClefTypes.RANDOM) {
      this.currentDiplayedClef = ClefTypes.SOL;
      if (Math.random() > 0.5) {
        this.currentDiplayedClef = ClefTypes.FA;
      }
    }

    this.currentClefDataset = clefGDataset;

    if (this.currentDiplayedClef === ClefTypes.FA) {
      this.currentClefDataset = clefFDataset;
    }
  }

  applyFilter() {
    this.isAtLeastOneNoteSelected = true;
    let auxDataset = clefFDataset;

    if (this.currentDiplayedClef === ClefTypes.SOL) {
      auxDataset = clefGDataset;
    }

    let resultDataset: any = [];

    const displayNotes = this.checkboxNotes.filter(
      (element) => element.checked
    );

    if (displayNotes.length === 0) {
      this.isAtLeastOneNoteSelected = false;
      return;
    }

    displayNotes.forEach((element) => {
      resultDataset.push(
        ...auxDataset.filter((e: any) => e.symbol === element.value)
      );
    });

    this.currentClefDataset = resultDataset;
  }

  checkNote(note: any) {
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

    if (this.clefTypeSelected === ClefTypes.RANDOM) {
      this.changeClef(ClefTypes.RANDOM);
    }

    this.applyFilter();

    this.currentNote =
      this.currentClefDataset[
        Math.floor(Math.random() * this.currentClefDataset.length)
      ];
  }

  filterChangeCallback(value: string) {
    let findNote = this.checkboxNotes.find(
      (element) => element.value === value
    );
    findNote ? (findNote.checked = !findNote?.checked) : null;
    this.applyFilter();
    this.newRandomNote();
  }
}
