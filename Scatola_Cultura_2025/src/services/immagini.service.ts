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

  /**
  * Flag che indica se le immagini sono già state caricate.
  * Serve per evitare di fare chiamate multiple non necessarie al servizio.
  */
  flgImmagini: boolean = false

  //Array che contiene tutte le immagini caricate dal servizio. 
  immagini: ImmagineDTO[] = [];

  /**
  * Carica le immagini dal servizio solo se non sono già state caricate in precedenza.
  * Se le immagini sono già presenti (`flgImmagini` è true e `immagini` ha elementi),
  * allora esce immediatamente.
  *
  * In caso contrario, chiama il servizio per ottenere le immagini, le assegna all'array locale,
  * e imposta `flgImmagini` su true. In caso di errore, stampa un messaggio in console
  * e imposta `flgImmagini` su false.
  */
  private caricaImmagini() {
    if (this.flgImmagini && this.immagini.length > 0) {
      //immagini già caricate
      return;
    } else {

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

  /**
  * Restituisce l'immagine associata a una struttura specifica in base al suo ID.
  *
  * @param id L'ID della struttura da cercare.
  * @returns L'oggetto `ImmagineDTO` corrispondente, oppure `undefined` se non trovato.
  */
  getImmagine(id: number): ImmagineDTO | undefined {
    return this.immagini.find(v => v.idStruttura == id)

  }
  /**
  * Restituisce tutte le immagini caricate.
  *
  * @returns L'array completo di oggetti `ImmagineDTO`.
  */
  getImmagini(): ImmagineDTO[] {
    return this.immagini
  }
}
