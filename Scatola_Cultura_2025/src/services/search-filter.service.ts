import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';


interface Filters {
  disabilita?: string[];
  tipi?: string[];
  province?: string[];
  filtroTestuale?: string;
}


@Injectable({
  providedIn: 'root'
})
export class SearchFilterService {


  //michael 


  private filters: Filters = {};

  
  constructor() { }
  
   // BehaviorSubject mantiene lo stato attuale del filtro di ricerca (stringa)
   // Inizializzato con stringa vuota (nessun filtro)
   private oggettoRicerca=new BehaviorSubject<string>('');
   
   // BehaviorSubject con filtro iniziale vuoto
   private filtroRicercaSubject = new BehaviorSubject<string>('');  
   
   // Observable pubblico a cui i componenti possono iscriversi per ricevere aggiornamenti
   filtroRicerca$=this.oggettoRicerca.asObservable()
   
   
   private reseted=new  BehaviorSubject<boolean>(false);
  reseted$=this.reseted.asObservable()

  emitReset(value:boolean){
    this.reseted.next(value)
  }

  
  //aggionrna il filtro testuale 
  setSearchFilter(filtro:string){
    this.oggettoRicerca.next(filtro)
    this.filters.filtroTestuale=filtro;
  }

  //restituisc i filtri salvati
  getFilters():Filters{
    return this.filters;
  }

  // Aggiorna tutti i filtri, e se c’è il filtro testuale aggiorna anche il BehaviorSubject per la ricerca
  setFilters(Filtri:Filters){
    this.filters=Filtri
    if(Filtri.filtroTestuale!==undefined)
      this.filtroRicercaSubject.next(Filtri.filtroTestuale)
  }
  

}
