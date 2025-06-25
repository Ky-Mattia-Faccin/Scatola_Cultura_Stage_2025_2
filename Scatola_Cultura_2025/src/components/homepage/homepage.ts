import { CommonModule } from '@angular/common';
import { OnInit, ViewChild, ElementRef, HostListener, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImmagineDTO, Struttura } from '../../interfaces/Istruttura';
import { StrutturaService } from '../../services/struttura.service';
import { FiltriComponent } from '../filtri/filtri.component';
import { SearchFilterService } from '../../services/search-filter.service';
import { TextimgTsService } from '../../services/textimg.service';
import { ImmaginiService } from '../../services/immagini.service';

@Component({
  standalone: true,
  selector: 'app-homepage',
  imports: [RouterModule, CommonModule, FiltriComponent],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css'
})
export class Homepage implements OnInit {
  constructor(
    private searchFilter: SearchFilterService,
    private servizioStruttura: StrutturaService,
    private textService: TextimgTsService,
    private imgService: ImmaginiService,
    private eRef: ElementRef
  ) {}

  partnerInfoOpen: boolean = false;
  strutture: Struttura[] = [];
  struttureFiltrate: Struttura[] = [];
  filtro: string = '';
  flgTrovati: boolean = true;
  FiltriDisabilita: string[] = [];
  FiltriTipi: string[] = [];
  FiltriProvince: string[] = [];
  flgDisabilita: boolean = false;
  isDescriptionActive: boolean = false;
  flgFiltriMobile: boolean = false;



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

  getImmagine(id: number): ImmagineDTO {
    const img = this.imgService.getImmagine(id);
    return img ?? {
      idImmagine: 0,
      idStruttura: id,
      nomeImmagine: 'placeholder',
      immagineUrl: 'assets/placeholder.png',
      didascaliaImmagine: ''
    };
  }

  toggleMobileFilters() {
    const contenitoreFiltri = document.querySelector('.sc-homepage-filter');
    contenitoreFiltri?.classList.toggle('hiddenMobile');
  }

  resetFiltri() {
    this.filtriComponent.resetFilters();
    this.checkSessionStorage();
  }

  iconClick() {
    this.partnerInfoOpen = !this.partnerInfoOpen;
    const contPartner = document.querySelector('.sc-homepage-partner-info') as HTMLElement;
    contPartner?.classList.toggle('hidden');
    const icon = document.querySelector('.sc-homepage-icon');
    if (icon) {
      icon.classList.toggle('rotated');
    }
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    if (!this.eRef.nativeElement.querySelector('.sc-homepage-partner-info-svg')?.contains(event.target as Node)) {
      this.partnerInfoOpen = false;
    }
  }

  filtraStrutture(): void {
    sessionStorage.setItem('filtri', JSON.stringify({
      disabilita: this.FiltriDisabilita,
      tipi: this.FiltriTipi,
      province: this.FiltriProvince,
      filtroTestuale: this.filtro,
    }));

    this.servizioStruttura
      .getStruttureFiltrate(this.FiltriDisabilita, this.FiltriTipi, this.FiltriProvince)
      .subscribe({
        next: (s) => {
          this.flgTrovati = s.length > 0;
          this.strutture = s;
          sessionStorage.setItem('strutture', JSON.stringify(s));
          this.applySearchFilter();
        },
        error: (err) => {
          console.error('Errore nel caricamento delle strutture');
          if (window.confirm('Errore nel caricamento delle strutture, vuoi riprovare?')) {
            this.filtraStrutture();
          }
        }
      });
  }

  private applySearchFilter() {
  const filtroLower = this.filtro ? this.filtro.toLowerCase() : '';
  this.struttureFiltrate = this.strutture.filter((s) =>
    // Se filtroLower è vuoto, include comunque la struttura; 
    // altrimenti la include solo se il nome contiene filtroLower
    (!filtroLower || s.nomeStruttura.toLowerCase().includes(filtroLower)) 
    && !s.flgDisabilita // esclude sempre strutture disabilitate
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
            immagine: { ...immagine, byteImmagine: undefined }
          }));
          try {
            sessionStorage.setItem('strutture', JSON.stringify(struttureDaSalvare));
          } catch (e) {
            console.warn('⚠️ Errore nel salvataggio su sessionStorage:', e);
          }
          this.applySearchFilter();
        },
        error: (err) => {
          console.error(err);
          if (window.confirm('Errore nel caricamento delle strutture, riprovare?')) {
            this.checkSessionStorage();
          }
        }
      });
    }
  }
}
