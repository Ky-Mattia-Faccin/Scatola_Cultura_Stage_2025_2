import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SearchFilterService {

  constructor() { }

  private oggettoRicerca=new BehaviorSubject<string>('');

  filtroRicerca$=this.oggettoRicerca.asObservable()


  setSearchFilter(filtro:string){
    this.oggettoRicerca.next(filtro)
  }





}
