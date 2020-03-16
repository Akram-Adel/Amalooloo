import { TestBed } from '@angular/core/testing';

import { CacheproviderService } from './cacheprovider.service';

describe('CacheproviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CacheproviderService = TestBed.get(CacheproviderService);
    expect(service).toBeTruthy();
  });
});
