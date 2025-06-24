import { CommonModule } from '@angular/common';
import {
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
  Component,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImmagineDTO, Struttura } from '../../interfaces/Istruttura';
import { StrutturaService } from '../../services/struttura.service';
import { FiltriComponent } from '../filtri/filtri.component';
import { SearchFilterService } from '../../services/search-filter.service';
import { TextimgTsService } from '../../services/textimg.service';
import { ImmaginiService } from '../../services/immagini.service';

/** Componente principale della homepage. Gestisce la visualizzazione, il filtraggio e l'interazione con le strutture. */
@Component({
  standalone: true,
  selector: 'app-homepage',
  imports: [RouterModule, CommonModule, FiltriComponent],
  templateUrl: './homepage.html',

  styleUrl: './homepage.css',
})
export class Homepage implements OnInit {
  /** Costruttore con iniezione dei servizi necessari */
  constructor(
    private searchFilter: SearchFilterService,
    private servizioStruttura: StrutturaService,
    private textService: TextimgTsService,
    private imgService: ImmaginiService,
    private eRef: ElementRef
  ) {}

  /** Flag per mostrare/nascondere il box informazioni partner */
  partnerInfoOpen: boolean = false;
  /** Elenco completo delle strutture */
  strutture: Struttura[] = [];
  /** Elenco filtrato delle strutture */
  struttureFiltrate: Struttura[] = [];
  /** Testo del filtro testuale */
  filtro: string = '';
  /** Flag che indica se sono state trovate strutture */
  flgTrovati: boolean = true;
  /** Filtri attivi per disabilità */
  FiltriDisabilita: string[] = [];
  /** Filtri attivi per tipo */
  FiltriTipi: string[] = [];
  /** Filtri attivi per provincia */
  FiltriProvince: string[] = [];
  /** Flag per filtrare strutture disabilitate */
  flgDisabilita: boolean = false;
  /** Flag per mostrare descrizioni delle immagini */
  isDescriptionActive: boolean = false;
  /** Flag per gestione visualizzazione mobile dei filtri */
  flgFiltriMobile: boolean = false;

  //flag immagini
  flgImmagini: boolean = false;

  //componente dei filtri
  @ViewChild(FiltriComponent) filtriComponent!: FiltriComponent;

  /** Michael
   * ngOnInit:
   * - recupera filtri precedenti da sessionStorage, se presenti
   * - carica strutture da sessionStorage o API
   * - si iscrive al filtro testuale (navbar)
   */

  /** Inizializza il componente recuperando i filtri salvati e caricando le strutture */
  ngOnInit(): void {
    const savedFilters = sessionStorage.getItem('filtri');
    if (savedFilters) {
      const parsed = JSON.parse(savedFilters);
      this.FiltriDisabilita = parsed.disabilita || [];
      this.FiltriTipi = parsed.tipi || [];
      this.FiltriProvince = parsed.province || [];
      this.filtro = parsed.filtroTestuale || '';
    }
    this.checkSessionStorage();
    this.searchFilter.filtroRicerca$.subscribe((value) => {
      this.filtro = value;
      this.applySearchFilter();
    });
    this.textService.isDescriptionActive$.subscribe((value) => {
      this.isDescriptionActive = value;
    });
  }

  /**
   * Restituisce l'immagine associata alla struttura, o un placeholder se non presente
   * @param id ID della struttura
   * @returns ImmagineDTO
   */

  getImmagine(id: number): ImmagineDTO {
    const img = this.imgService.getImmagine(id);
    return (
      img ?? {
        idImmagine: 0,
        idStruttura: id,
        nomeImmagine: 'placeholder',
        immagineUrl: 'assets/placeholder.png',
        didascaliaImmagine: '',
      }
    );
  }

  /** Alterna la visibilità dei filtri su dispositivi mobili */
  toggleMobileFilters() {
    const contenitoreFiltri = document.querySelector('.sc-homepage-filter');
    contenitoreFiltri?.classList.toggle('hiddenMobile');
  }

  /** Reset dei filtri e ricaricamento delle strutture */
  resetFiltri() {
    this.filtriComponent.resetFilters();
    this.checkSessionStorage();
  }

  /** Gestisce il click sull’icona per mostrare/nascondere informazioni partner */
  iconClick() {
    this.partnerInfoOpen = !this.partnerInfoOpen;
    const contPartner = document.querySelector(
      '.sc-homepage-partner-info'
    ) as HTMLElement;
    contPartner?.classList.toggle('hidden');
    const icon = document.querySelector('.sc-homepage-icon');
    if (icon) {
      icon.classList.toggle('rotated');
    }
  }

  /**
   * Listener globale per chiudere il box partner cliccando fuori
   * @param event Evento di click
   */
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    if (
      !this.eRef.nativeElement
        .querySelector('.sc-homepage-partner-info-svg')
        ?.contains(event.target as Node)
    ) {
      this.partnerInfoOpen = false;
    }
  }

  /*
toggleMenu() {
    const dropDownMenu = document.querySelector('.sc-navbar-dropdown-menu');
    dropDownMenu?.classList.toggle('hidden');
  }

  /** Applica i filtri selezionati e aggiorna le strutture da mostrare */
  filtraStrutture(): void {
    sessionStorage.setItem(
      'filtri',
      JSON.stringify({
        disabilita: this.FiltriDisabilita,
        tipi: this.FiltriTipi,
        province: this.FiltriProvince,
        filtroTestuale: this.filtro,
      })
    );
    this.servizioStruttura
      .getStruttureFiltrate(
        this.FiltriDisabilita,
        this.FiltriTipi,
        this.FiltriProvince
      )
      .subscribe({
        next: (s) => {
          this.flgTrovati = s.length > 0;
          this.strutture = s;
          sessionStorage.setItem('strutture', JSON.stringify(s));
          this.applySearchFilter();
        },
        error: (err) => {
          console.error('Errore nel caricamento delle strutture');
          if (
            window.confirm(
              'Errore nel caricamento delle strutture, vuoi riprovare?'
            )
          ) {
            this.filtraStrutture();
          }
        },
      });
  }

  /** Applica il filtro testuale alle strutture e aggiorna la lista mostrata */
  private applySearchFilter() {
    const filtroLower = this.filtro ? this.filtro.toLowerCase() : '';
    this.struttureFiltrate = this.strutture.filter(
      (s) =>
        // Se filtroLower è vuoto, include comunque la struttura;
        // altrimenti la include solo se il nome contiene filtroLower
        (!filtroLower || s.nomeStruttura.toLowerCase().includes(filtroLower)) &&
        !s.flgDisabilita // esclude sempre strutture disabilitate
    );
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
d6b (css)
   */

  /** Verifica se ci sono strutture in sessionStorage, altrimenti le carica dal server */
  private checkSessionStorage() {
    const struttureJSON = sessionStorage.getItem('strutture');
    if (struttureJSON && struttureJSON !== '[]') {
      this.strutture = JSON.parse(struttureJSON);

      this.struttureFiltrate = this.strutture;

      this.applySearchFilter();
    } else {
      this.servizioStruttura.getStrutture().subscribe({
        next: (s) => {
          this.strutture = s;
          const struttureDaSalvare = s.map(({ immagine, ...rest }) => ({
            ...rest,
            immagine: { ...immagine, byteImmagine: undefined },
          }));
          try {
            sessionStorage.setItem(
              'strutture',
              JSON.stringify(struttureDaSalvare)
            );
          } catch (e) {
            console.warn('⚠️ Errore nel salvataggio su sessionStorage:', e);
          }
          this.applySearchFilter();
        },
        error: (err) => {
          console.error(err);
          if (
            window.confirm('Errore nel caricamento delle strutture, riprovare?')
          ) {
            this.checkSessionStorage();
          }
        },
      });
    }
  }
}
