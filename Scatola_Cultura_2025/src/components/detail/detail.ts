import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { Struttura } from '../../interfaces/Istruttura';
import { DisabilitaStruttura } from '../../interfaces/IDisabilitàStruttura';
import { IconeManager } from '../../services/IconeManager';
import { DetailTestoComponent } from './detail-testo/detail-testo.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StrutturaService } from '../../services/struttura.service';

@Component({
  standalone: true,
  selector: 'app-detail',
  imports: [RouterModule, RouterLink, CommonModule, DetailTestoComponent, HttpClientModule],
  templateUrl: './detail.html',
  styleUrls: ['./detail.css'],
})
export class Detail implements OnInit {

  //michael


  /* Costruttore con dipendenze iniettate:
     - IconeManager per gestire le icone
     - ActivatedRoute per leggere i parametri dalla URL
     - HttpClient per effettuare richieste HTTP
     - StrutturaService per recuperare dati strutture e disabilità
  */
  constructor(
    private iconeManager: IconeManager,
    private route: ActivatedRoute,
    private httpsClient: HttpClient,
    private servizioStruttura: StrutturaService
  ) {}

  // ID della struttura corrente (ottenuto dalla route)
  idStruttura!: number;

  // Oggetto Struttura da visualizzare nel dettaglio
  struttura!: Struttura;

  /*
   * OnInit:
   * - Recupera l'ID della struttura dalla route
   * - Carica la struttura dal localStorage
   * - Esegue richiesta HTTP per ottenere i dati delle disabilità (decidere se va usato)
  */
  ngOnInit(): void {
    const parametroId = this.route.snapshot.paramMap.get('id');

    if (parametroId != null) {
      this.idStruttura = parseInt(parametroId, 10);

      // Caricamento delle strutture dal localStorage
      const strutture: Struttura[] = JSON.parse(localStorage.getItem('strutture') || '[]');

      // Ricerca della struttura con l'ID specificato
      const trovata = strutture.find((s: Struttura) => s.idStruttura === this.idStruttura);

      if (trovata)
        this.struttura = trovata;
      else {
        console.error(`Struttura con id: ${this.idStruttura} non trovata`);
      }

      // Recupero dei dati di accessibilità/disabilità associati alla struttura
      /* in caso di seconda chiamata per ricevere le disabilità
      this.servizioStruttura.getDisabilita(this.idStruttura).subscribe(dato => {
        this.disabilitaStruttura = dato;
      });
      */
    } else {
      console.error(`La struttura con id: ${this.idStruttura} non esiste`);
    }
  }

  // Accesso alle icone tramite IconeManager
  Icone = this.iconeManager;

  /*
   * Metodo per attivare/disattivare lo zoom sui contenitori di dettaglio.
   * Cerca il contenitore padre più vicino con classi specifiche e ne attiva/disattiva la classe 'sc-zoomed'
   */
  toggleZoom(container: HTMLElement) {
    let element = container.closest('.sc-detail-center-desc')?.classList.toggle('sc-zoomed');
    if (!element)
      element = container.closest('.sc-detail-footer-accessibility')?.classList.toggle('sc-zoomed');
  }

}
