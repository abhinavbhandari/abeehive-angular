import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynthboardComponent } from './synthboard.component';

describe('SynthboardComponent', () => {
  let component: SynthboardComponent;
  let fixture: ComponentFixture<SynthboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynthboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynthboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
