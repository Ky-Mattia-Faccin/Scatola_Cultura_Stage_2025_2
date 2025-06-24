import { CommonModule } from '@angular/common';
import { OnInit, ViewChild } from '@angular/core';
import { StrutturaService } from '../../services/struttura.service';
import { FiltriComponent } from '../filtri/filtri.component';
import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImmagineDTO, Struttura } from '../../interfaces/Istruttura';
import { SearchFilterService } from '../../services/search-filter.service';
import { TextimgTsService } from '../../services/textimg.service';
import { ImmaginiService } from '../../services/immagini.service';

@Component({
  standalone: true,
  selector: 'app-homepage',
  imports: [RouterModule, CommonModule, FiltriComponent],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage implements OnInit {
  // michael: Iniezione del servizio per la gestione del filtro di ricerca
  //simone:  Iniezione del servizio per la geststione del booleano per la descrizione
  constructor(
    private searchFilter: SearchFilterService,
    private servizioStruttura: StrutturaService,
    private textService: TextimgTsService,
    private imgService: ImmaginiService
  ) { }

  // Lista completa delle strutture ottenute da API
  strutture: Struttura[] = [];

  //lista per le immagini
  immagini: ImmagineDTO[] = [];


  // Lista filtrata da mostrare nell'interfaccia
  struttureFiltrate: Struttura[] = this.strutture;

  // Valore corrente del filtro testuale (ricerca)
  filtro!: string;

  //flag per capire se non sono stati trovati musei
  flgTrovati: boolean = true;

  // Filtri selezionati dai componenti figli
  FiltriDisabilita: string[] = [];
  FiltriTipi: string[] = [];
  FiltriProvince: string[] = [];

  // flag per vedere se la disabilità 
  flgDisabilita!: boolean;

  //flag immagini
  flgImmagini: boolean = false;

  //componente dei filtri
  @ViewChild(FiltriComponent) filtriComponent!: FiltriComponent



  /** Michael
   * ngOnInit:
   * - recupera filtri precedenti da sessionStorage, se presenti
   * - carica strutture da sessionStorage o API
   * - si iscrive al filtro testuale (navbar)
   */
  ngOnInit(): void {
    this.immagini = this.imgService.getImmagini()
    // Carica eventuali filtri salvati precedentemente
    const savedFilters = sessionStorage.getItem('filtri');
    if (savedFilters) {
      const parsed = JSON.parse(savedFilters);
      this.FiltriDisabilita = parsed.disabilita || [];
      this.FiltriTipi = parsed.tipi || [];
      this.FiltriProvince = parsed.province || [];
      this.filtro = parsed.filtroTestuale || '';
    }
    // Carica strutture da sessionStorage o fa chiamata API se vuoto
    this.checkSessionStorage();

    // Si iscrive ai cambiamenti del filtro testuale (search bar)
    this.searchFilter.filtroRicerca$.subscribe((value) => {
      this.filtro = value;
      this.applySearchFilter();
    });

    //Simone: riceve il booleano dalla navbar e lo usa per inserire una descrizione sull'immagine
    this.textService.isDescriptionActive$.subscribe((value) => {
      this.isDescriptionActive = value;
    });

  }

  //simone
  //creazione del booleano
  isDescriptionActive: boolean = false;

  //al cambiamento del checkbox se false non deve mostare la descrizione altrimenti al passaggio sopra una immagine (hover) deve inviare il valore
  toggleMenu() {
    const dropDownImg = document.querySelector('.sc-homepage-card-img-text');
    dropDownImg?.classList.toggle('hidden');
  }

  /**
   * Michael
   * Metodo chiamato quando l’utente clicca "Applica Filtri"
   * - Salva i filtri su sessionStorage
   * - Chiama l’API per ottenere solo le strutture corrispondenti ai filtri
   */
  filtraStrutture(): void {
    // Salva i filtri applicati su sessionStorage
    sessionStorage.setItem(
      'filtri',
      JSON.stringify({
        disabilita: this.FiltriDisabilita,
        tipi: this.FiltriTipi,
        province: this.FiltriProvince,
        filtroTestuale: this.filtro,
      })
    );

    // Chiamata API con i filtri correnti

    this.servizioStruttura
      .getStruttureFiltrate(
        this.FiltriDisabilita,
        this.FiltriTipi,
        this.FiltriProvince
      )
      .subscribe({
        next: (s) => {
          if (s.length === 0) {
            // Nessun risultato trovato
            this.flgTrovati = false;
          } else {
            // Strutture trovate, le salva e applica il filtro testuale
            this.strutture = s;
            sessionStorage.setItem('strutture', JSON.stringify(s));
            this.applySearchFilter();

            this.flgTrovati = true;
          }
        } /* gestione errore */,
        error: (err) => {
          console.error('Errore nel caricamento delle strutture');
          const riprova = window.confirm(
            'Errore nel caricamento delle strutture, vuoi riprovare?'
          );
          if (riprova) this.filtraStrutture();
        },
      });
  }

  /**
   * Michael
   * Applica il filtro testuale alla lista di strutture già filtrate per tipo/disabilità/provincia
   * Mostra solo quelle che contengono il testo cercato nel nomeStruttura
   * 
   * Simone
   * controlla se il flgDisabilita è false quindi inserisce la struttura altrimenti se true non inserisce la struttura
   */
  private applySearchFilter() {
    if (!this.filtro) {
      // Se il filtro è vuoto, mostra tutte le strutture
      this.struttureFiltrate = this.strutture;
    } else {
      // Altrimenti filtra per nome (case insensitive)
      const filtroLower = this.filtro.toLowerCase();
      this.struttureFiltrate = this.strutture.filter((s) =>
        s.nomeStruttura.toLowerCase().includes(filtroLower) && !s.flgDisabilita
      );
    }


  }
  /**
   * Michael
   * Controlla se esistono strutture in sessionStorage:
   * - Se sì, le carica
   * - Se no, fa la chiamata all’API per ottenerle
   * Tutto viene poi filtrato in base al testo cercato.
   * 
   * Simone
   * se il flag disalibità è attivato la struttura non viene mostrata
   * non carica le immagini nel sessionStorage perchè è troppo pesante
   */
  private checkSessionStorage() {
    const struttureJSON = sessionStorage.getItem('strutture');

    if (struttureJSON && struttureJSON !== '[]') {
      this.strutture = JSON.parse(struttureJSON);
      this.applySearchFilter();
    } else {
      this.servizioStruttura.getStrutture().subscribe({
        next: (s) => {
          this.strutture = s;

          // Rimuove byteImmagine prima del salvataggio
          const struttureDaSalvare = s.map(struttura => {
            const { immagine, ...rest } = struttura;
            return {
              ...rest,
              immagine: {
                ...immagine,
                byteImmagine: undefined
              }
            };
          });

          try {
            sessionStorage.setItem('strutture', JSON.stringify(struttureDaSalvare));
          } catch (e) {
            console.warn('⚠️ Errore nel salvataggio su sessionStorage:', e);
          }

          this.applySearchFilter();
        },
        error: (err) => {
          console.error(err);
          const riprova = window.confirm(
            'Errore nel caricamento delle strutture, riprovare?'
          );
          if (riprova) this.checkSessionStorage();
        },
      });
    }
  }


  //flag per la visualizzazione della selezione dei filtri in mobile
  flgFiltriMobile = false;

  /*metodo per visualizzare la selezione dei filtri in mobile
   * aggiunge la classe hidden ai filtri
   */
  toggleMobileFilters() {
    const contenitoreFiltri = document.querySelector('.sc-homepage-filter');
    contenitoreFiltri?.classList.toggle('hiddenMobile');
  }

  resetFiltri() {
    this.filtriComponent.resetFilters()
    this.checkSessionStorage();
  }

  /**
   * Simone
   * quando viene premuta la icona svg della freccia apre un menu con all'interno i partner e quando viene ripremuta chiude la finestra;
   * quando vine premuta la icona si gira di 180° e quando viene premuta per uscire ritorna a 90°.
   */
  iconClick() {
    const contPartner = document.querySelector('.sc-homepage-partner-info') as HTMLElement;
    contPartner?.classList.toggle('hidden');

    const icon = document.querySelector('.sc-homepage-icon');
    if (icon) {
      icon.classList.toggle('rotated');
    }
  }

  getImmagine(id: number): ImmagineDTO {
    const img = this.imgService.getImmagine(id);
    return img ?? {
      idImmagine:0,
    idStruttura: id,
    nomeImmagine:'placeholder',
    immagineUrl:'assets/placeholder.png',
    didascaliaImmagine: ''
  };
  }
}