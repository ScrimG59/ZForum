/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserAccountResolverService } from './user-account-resolver.service';

describe('Service: UserAccountResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserAccountResolverService]
    });
  });

  it('should ...', inject([UserAccountResolverService], (service: UserAccountResolverService) => {
    expect(service).toBeTruthy();
  }));
});
