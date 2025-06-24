import { Injectable, OnInit } from '@angular/core';
import { StrutturaService } from './struttura.service';
import { Struttura } from '../interfaces/Istruttura';
import { ImmagineDTO } from '../interfaces/Istruttura';
@Injectable({
  providedIn: 'root'
})
export class ImmaginiService {


  constructor(
    private servizioStruttura: StrutturaService
  ) {
    this.caricaImmagini()
  }




  flgImmagini: boolean = false

  immagini: ImmagineDTO[] = [];


  private caricaImmagini() {
    if (this.flgImmagini && this.immagini.length>0) {
      //immagini già caricate
      return;
    }else{

    this.servizioStruttura.getImmagini().subscribe({
      next: (immagini) => {
        this.immagini = immagini;
        this.flgImmagini = true; 
      },
      error: (err) => {
        console.error('Errore nel caricamento immagini:', err);
        this.flgImmagini = false;
      }
    });
  }
  }


  getImmagine(id: number): ImmagineDTO | undefined {
    return this.immagini.find(v => v.idStruttura == id)

  }

  getImmagini(): ImmagineDTO[] {
    return this.immagini
  }
}
