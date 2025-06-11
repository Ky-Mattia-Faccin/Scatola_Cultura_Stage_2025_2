import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SearchFilterService {


  //michael 


  constructor() { }

   // BehaviorSubject mantiene lo stato attuale del filtro di ricerca (stringa)
  // Inizializzato con stringa vuota (nessun filtro)
  private oggettoRicerca=new BehaviorSubject<string>('');


  // Observable pubblico a cui i componenti possono iscriversi per ricevere aggiornamenti
  filtroRicerca$=this.oggettoRicerca.asObservable()



  
  /*
   * Metodo per aggiornare il filtro di ricerca:
   * - Prende una stringa (filtro)
   * - Aggiorna il valore interno del BehaviorSubject (emette a tutti gli iscritti)
   */
  setSearchFilter(filtro:string){
    this.oggettoRicerca.next(filtro)
  }





}
