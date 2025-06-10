import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { Struttura } from '../../interfaces/Istruttura';
import { DisabilitaStruttura } from '../../interfaces/IDisabilitàStruttura';
import { IconeManager } from '../../services/IconeManager';
import { DetailTestoComponent } from './detail-testo/detail-testo.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-detail',
  imports: [RouterModule, RouterLink, CommonModule, DetailTestoComponent, HttpClientModule],
  templateUrl: './detail.html',
  styleUrls: ['./detail.css'],
})
export class Detail implements OnInit {

  /* Costruttore con dipendenze iniettate:
     - IconeManager per gestire le icone
     - ActivatedRoute per leggere i parametri dalla URL
     - HttpClient per effettuare richieste HTTP
  */
  constructor(
    private iconeManager: IconeManager,
    private route: ActivatedRoute,
    private httpsClient: HttpClient
  ) {}

  // ID della struttura corrente (ottenuto dalla route)
  idStruttura!: number;

  // Oggetto Struttura da visualizzare nel dettaglio
  struttura!: Struttura;

  // Array contenente i dati di accessibilità/disabilità della struttura
  disabilitaStruttura!: DisabilitaStruttura[];

  /*
   * OnInit:
   * - Recupera l'ID della struttura dalla route
   * - Carica la struttura dal localStorage
   * - Esegue richiesta HTTP per ottenere i dati delle disabilità
  */
  ngOnInit(): void {
    const parametroId = this.route.snapshot.paramMap.get('id');

    if (parametroId != null) {
      this.idStruttura = parseInt(parametroId, 10);

      // Caricamento delle strutture dal localStorage
      const strutture: Struttura[] = JSON.parse(localStorage.getItem('strutture') || '[]');

      // Ricerca della struttura con l'ID specificato
      const trovata = strutture.find((s: Struttura) => s.id === this.idStruttura);

      if (trovata)
        this.struttura = trovata;
      else {
        console.error(`Struttura con id: ${this.idStruttura} non trovata`);
      }

      // Recupero dei dati di accessibilità/disabilità associati alla struttura
      this.getDisabilita().subscribe(dato => {
        this.disabilitaStruttura = dato;
      });

    } else {
      console.error(`La struttura con id: ${this.idStruttura} non esiste`);
    }
  }

  // Metodo per recuperare i dati di disabilità dal file JSON
  getDisabilita(): Observable<DisabilitaStruttura[]> {
    return this.httpsClient.get<DisabilitaStruttura[]>('./assets/disabilita_struttura.json');
  }

  // Accesso alle icone tramite IconeManager
  Icone = this.iconeManager;


  //Metodo per attivare/disattivare lo zoom sui contenitori di dettaglio.
  toggleZoom(container: HTMLElement) {
    let element = container.closest('.sc-detail-center-desc')?.classList.toggle('sc-zoomed');
    if (!element)
      element = container.closest('.sc-detail-footer-accessibility')?.classList.toggle('sc-zoomed');
  }

}