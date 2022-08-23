import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { ClefTypes } from '../../../models/clef-types-enum';

@Component({
  selector: 'app-clef-selector',
  templateUrl: './clef-selector.component.html',
  styleUrls: ['./clef-selector.component.scss'],
})
export class ClefSelectorComponent implements OnInit {
  @Output() bySelectClef = new EventEmitter<ClefTypes>();
  selectedClef = ClefTypes.RANDOM;
  ClefTypes = ClefTypes;

  ngOnInit() {
    this.bySelectClef.emit(this.selectedClef);
  }

  selectClef(clefType: ClefTypes) {
    this.selectedClef = clefType;
    this.bySelectClef.emit(clefType);
  }
}
