import { TestBed } from '@angular/core/testing';

import { TranslationServiceService } from './translation-service.service';

describe('TranslationServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TranslationServiceService = TestBed.get(TranslationServiceService);
    expect(service).toBeTruthy();
  });
});
