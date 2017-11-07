import { TestBed, inject } from '@angular/core/testing';

import { EnterprisesService } from './enterprise.service';

describe('EnterprisesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnterprisesService]
    });
  });

  it('should be created', inject([EnterprisesService], (service: EnterprisesService) => {
    expect(service).toBeTruthy();
  }));
});
