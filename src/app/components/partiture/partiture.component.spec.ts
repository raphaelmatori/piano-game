import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartitureComponent } from './partiture.component';

describe('PartitureComponent', () => {
  let component: PartitureComponent;
  let fixture: ComponentFixture<PartitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartitureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
