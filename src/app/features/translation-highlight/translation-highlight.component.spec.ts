import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationHighlightComponent } from './translation-highlight.component';

describe('TranslationHighlightComponent', () => {
  let component: TranslationHighlightComponent;
  let fixture: ComponentFixture<TranslationHighlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslationHighlightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationHighlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
