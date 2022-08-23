import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { ClefSelectorComponent } from './clef-selector.component';
import { ClefTypes } from '../../../models/clef-types-enum';

describe('ClefSelector Component', () => {
  let component: ClefSelectorComponent;
  let fixture: ComponentFixture<ClefSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClefSelectorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClefSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit bySelectClef event onInit with value ClefTypes.RANDOM', () => {
    spyOn(component.bySelectClef, 'emit');
    component.ngOnInit();
    expect(component.bySelectClef.emit).toHaveBeenCalled();
    expect(component.bySelectClef.emit).toHaveBeenCalledWith(ClefTypes.RANDOM);
  });

  it('should set selectedClef on selectClef action', () => {
    component.selectClef(ClefTypes.FA);
    expect(component.selectedClef).toBe(ClefTypes.FA);

    component.selectClef(ClefTypes.SOL);
    expect(component.selectedClef).toBe(ClefTypes.SOL);
  });

  it('should emit bySelectClef event on selectClef action', () => {
    spyOn(component.bySelectClef, 'emit');
    component.selectClef(ClefTypes.FA);
    expect(component.bySelectClef.emit).toHaveBeenCalledOnceWith(ClefTypes.FA);
  });
});
