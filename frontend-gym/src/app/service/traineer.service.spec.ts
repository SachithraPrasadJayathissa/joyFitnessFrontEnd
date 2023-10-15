import { TestBed } from '@angular/core/testing';

import { TraineerService } from './traineer.service';

describe('TraineerService', () => {
  let service: TraineerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraineerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
