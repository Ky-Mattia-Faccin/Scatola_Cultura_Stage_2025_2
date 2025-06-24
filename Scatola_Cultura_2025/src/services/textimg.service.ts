import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
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

  /**
  * Simone
  * Metodo per inserire i testi semplici:
  *  - Prende il valore booleano passato dalla navbar
  *  - Passa il valore a detailTesto per il testo semplificato 
  */
  private isTextSemplifiedActive = new BehaviorSubject<boolean>(false);
  isTextSemplifiedActive$ = this.isTextSemplifiedActive.asObservable();
  //ogni volta che cambia il valore dalla nav bar glielo passa a homepage e detail
  textSemplifiedChange(value: boolean) {
    this.isTextSemplifiedActive.next(value);
  }
}