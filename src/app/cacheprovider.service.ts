import { Injectable } from '@angular/core';
import { Observable, defer, isObservable, of } from 'rxjs';
import { shareReplay, first, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CacheproviderService {

  constructor() { }


  preload(ttl:number) {
    
  }

}
