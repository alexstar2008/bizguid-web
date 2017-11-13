import { TestBed, inject } from '@angular/core/testing';

import { EnterpriseService } from './enterprise.service';

describe('EnterprisesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnterpriseService]
    });
  });

  it('should be created', inject([EnterpriseService], (service: EnterpriseService) => {
    expect(service).toBeTruthy();
  }));
});
