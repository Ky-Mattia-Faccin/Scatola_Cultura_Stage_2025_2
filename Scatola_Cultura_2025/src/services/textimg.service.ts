import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TextimgTsService {

  constructor() { }
  
  //simone + michael

  //  Attributo privato che mantiene lo stato (true/false)
 
  private isDescriptionActive = new BehaviorSubject<boolean>(false);
  isDescriptionActive$ = this.isDescriptionActive.asObservable();
  //ogni volta che cambia il valore dalla nav bar glielo passa a homepage e detail
  triggerChange(value: boolean) {
    this.isDescriptionActive.next(value);
  }
}