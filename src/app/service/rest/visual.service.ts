import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisualService {

  sideNavColor$: Subject<any> = new Subject();

  constructor() { }

  changeColor(color: any){
    this.sideNavColor$.next(color);
  }
}
