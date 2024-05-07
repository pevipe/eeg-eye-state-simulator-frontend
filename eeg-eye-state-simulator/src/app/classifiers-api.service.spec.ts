import { TestBed } from '@angular/core/testing';

import { ClassifiersApiService } from './classifiers-api.service';

describe('ClassifiersApiService', () => {
  let service: ClassifiersApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassifiersApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
