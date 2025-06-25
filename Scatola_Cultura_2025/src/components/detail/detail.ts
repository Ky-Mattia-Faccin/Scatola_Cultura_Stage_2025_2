import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';

import { ImmagineDTO, Struttura } from '../../interfaces/Istruttura';
import { Disabilita } from '../../interfaces/Istruttura';

import { IconeManager } from '../../services/IconeManager';
import { DetailTestoComponent } from './detail-testo/detail-testo.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { map, Observable, shareReplay, tap } from 'rxjs';

import { StrutturaService } from '../../services/struttura.service';
import { TextimgTsService } from '../../services/textimg.service';

// Interfaccia che descrive la struttura dati che arriva dal backend per le disabilità
export interface DisabilitaBackend {
  idStruttura: number;
  descrizione: string;
  flgDisabilita: boolean;
  disabilitaStruttura: number;
  testoSemplificato: string;
  disabilita: {
    categoria: string;
    descrizione: string;
    flgDisabilita: boolean;
  };
  flgWarning: boolean;
}

@Component({
  standalone: true,
  selector: 'app-detail',
  imports: [
    RouterModule,
    RouterLink,
    CommonModule,
    DetailTestoComponent,
    HttpClientModule,
  ],
  templateUrl: './detail.html',
  styleUrls: ['./detail.css'],
})
export class Detail implements OnInit {
  // Array di disabilità associate alla struttura
  disabilita: Disabilita[] = [];

  /*
    Costruttore con dependency injection:
    - IconeManager: gestisce le icone usate nel template
    - ActivatedRoute: per leggere i parametri dalla URL
    - HttpClient: per richieste HTTP (non usato direttamente qui)
    - StrutturaService: per recuperare dati relativi a strutture e disabilità
    - TextimgTsService: per ricevere il valore booleano che indica se attivare descrizioni semplificate
  */
  constructor(
    private iconeManager: IconeManager,
    private route: ActivatedRoute,
    private httpsClient: HttpClient,
    private servizioStruttura: StrutturaService,
    private textService: TextimgTsService
  ) {}

  // ID della struttura corrente preso dalla route
  idStruttura!: number;

  // Oggetto struttura con i dati da visualizzare nel dettaglio
  struttura!: Struttura;

  // Array contenente i dati di accessibilità/disabilità della struttura
  disabilitaStruttura!: Disabilita[];

  // Booleano per mostrare/nascondere la descrizione semplificata (es. didascalia immagine)
  isDescriptionActive: boolean = false;
  /*
   * Metodo OnInit:
   * - Recupera l'ID della struttura dai parametri della URL
   * - Carica la struttura dal sessionStorage
   * - Se esiste, carica le disabilità della struttura dal backend (con caching in sessionStorage)
   * - Si iscrive al servizio textService per ricevere il booleano isDescriptionActive
   */
  ngOnInit(): void {
    // Sottoscrizione al servizio che fornisce il booleano per testi semplici/didascalia
    this.textService.isDescriptionActive$.subscribe((value) => {
      this.isDescriptionActive = value;
    });

    // Legge l'id struttura dai parametri della route
    const parametroId = this.route.snapshot.paramMap.get('id');

    if (parametroId != null) {
      this.idStruttura = parseInt(parametroId, 10);

      // Carica le strutture dalla sessionStorage
      const strutture: Struttura[] = JSON.parse(
        sessionStorage.getItem('strutture') || '[]'
      );

      // Cerca la struttura con l'id specificato
      const trovata = strutture.find(
        (s: Struttura) => s.idStruttura === this.idStruttura
      );

      if (trovata) {
        this.struttura = trovata;
        console.log(this.struttura);

        // Se non esiste il caching in sessionStorage per le disabilità di questa struttura
        if (!sessionStorage.getItem(`disabilità${this.idStruttura}`)) {
          // Chiamata HTTP per ottenere le disabilità dal backend, poi mapparle nel formato corretto
          this.servizioStruttura
            .getDisabilitàStruttura(this.idStruttura)
            .pipe(
              map((dataFromBackend: DisabilitaBackend[]): Disabilita[] =>
                dataFromBackend.map(
                  (item: DisabilitaBackend): Disabilita => ({
                    idStruttura: item.idStruttura,
                    categoria: {
                      nome: item.disabilita.categoria,
                      descrizione: item.disabilita.descrizione,
                      flgDisabilita: item.disabilita.flgDisabilita,
                    },
                    descrizione: item.descrizione,
                    testoSemplice: item.testoSemplificato,
                    flgDisabilita: item.flgDisabilita,
                    disabilitaStruttura: item.disabilitaStruttura,
                    flgWarning: item.flgWarning,
                  })
                )
              ),
              tap((mappedDisabilita: Disabilita[]) => {
                this.disabilita = mappedDisabilita;
                // Salvo in sessionStorage per caching
                sessionStorage.setItem(
                  `disabilità${this.idStruttura}`,
                  JSON.stringify(this.disabilita)
                );
                // Aggiorna anche la proprietà disabilita della struttura, se usata altrove
                this.struttura.disabilita = mappedDisabilita;
              }),
              shareReplay(1)
            )
            .subscribe({
              next: () => {
                /* caricamento completato */
              },
              error: (err) => {
                console.error('Errore nel caricamento disabilità:', err);
              },
            });
        } else {
          // Se già presente il caching, lo recupero da sessionStorage per evitare chiamate HTTP
          const Json = sessionStorage.getItem(`disabilità${this.idStruttura}`);
          this.disabilita = JSON.parse(Json!);
        }
      } else {
        console.error(`Struttura con id: ${this.idStruttura} non trovata`);
      }
    } else {
      console.error(`La struttura con id: ${this.idStruttura} non esiste`);
    }
  }

  // Espongo le icone tramite IconeManager per usarle nel template
  Icone = this.iconeManager;

  /*
   * Metodo per attivare/disattivare lo zoom sui contenitori di dettaglio:
   * - Cerca il contenitore padre più vicino con classi specifiche
   * - Attiva/disattiva la classe 'sc-zoomed' per il zoom visivo
   */
  toggleZoom(container: HTMLElement) {
    let element = container
      .closest('.sc-detail-center-desc')
      ?.classList.toggle('sc-zoomed');
    if (!element)
      element = container
        .closest('.sc-detail-footer-accessibility')
        ?.classList.toggle('sc-zoomed');
  }

  /**
   * Metodo per mostrare/nascondere la didascalia immagine se il booleano isDescriptionActive è true.
   * Il trigger è un passaggio del mouse sopra l'immagine
   */
  toggleMenu() {
    const dropDownImg = document.querySelector('.sc-detail-center-desc-img');
    dropDownImg?.classList.toggle('hidden');
  }

  //proprietà calcolate per collegare i link (da completare appena si avranno i dati)

  get linkInstagram() {

    const raw=this.struttura.social1.trim();

    if(!raw || raw==='')
      return null

    return raw
  }

  get linkSito() {
    const raw=this.struttura.sitoWeb.trim();

    if(!raw || raw==='')
      return null

    return raw
  }

  get linkPosizione() {
    const raw=this.struttura.posizione.trim();

    if(!raw || raw==='')
      return null

    return raw
  }

  get linkFacebook() {
    const raw=this.struttura.social2.trim();

    if(!raw || raw==='')
      return null

    return raw

  }
}
