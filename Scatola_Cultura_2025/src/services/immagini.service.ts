import { Injectable, OnInit } from '@angular/core';
import { StrutturaService } from './struttura.service';
import { Struttura } from '../interfaces/Istruttura';
import { ImmagineDTO } from '../interfaces/Istruttura';
@Injectable({
  providedIn: 'root'
})
export class ImmaginiService  {


  constructor(
    private servizioStruttura : StrutturaService
  ) { }




  flgImmagini : boolean = false

  immagini: ImmagineDTO[] = [];



  private caricaImmagini(){
    if(!this.flgImmagini)
    { 
      this.servizioStruttura.getImmagini().subscribe(immagini => {
        this.immagini=immagini
        
        this.flgImmagini=true;
      });
    }
  }



  getImmagine(id:number):ImmagineDTO| undefined{
    this.caricaImmagini()
    return this.immagini.find(v=>v.idStruttura==id)
    
  }

  getImmagini():ImmagineDTO[]{
    this.caricaImmagini()
    return this.immagini
  }
}
