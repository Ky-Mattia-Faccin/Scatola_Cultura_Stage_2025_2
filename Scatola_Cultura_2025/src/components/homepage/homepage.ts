
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { StrutturaService } from '../../services/struttura.service';
import { FiltriComponent } from '../filtri/filtri.component';
import { Component,OnChanges, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Struttura } from '../../interfaces/Istruttura';
import { SearchFilterService } from '../../services/search-filter.service';
import { TextimgTsService } from '../../services/textimg.service';


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
    private textService: TextimgTsService
  ) {}

  // Lista completa delle strutture ottenute da API
  strutture: Struttura[] = [];

  // Lista filtrata da mostrare nell'interfaccia
  struttureFiltrate: Struttura[] = this.strutture;

  // Valore corrente del filtro testuale (ricerca)
  filtro!: string;


  // Filtri selezionati dai componenti figli

  FiltriDisabilita: string[] = [];
  FiltriTipi: string[] = [];
  FiltriProvince: string[] = [];

  /*
   * ngOnInit:
   */

  // Grandezza testo
  textSize!: number;


  ngOnInit(): void {
    // carica filtri dal servizio
    const savedFilters = sessionStorage.getItem('filtri');
    if (savedFilters) {
      const parsed = JSON.parse(savedFilters);
      this.FiltriDisabilita = parsed.disabilita || [];
      this.FiltriTipi = parsed.tipi || [];
      this.FiltriProvince = parsed.province || [];
      this.filtro = parsed.filtroTestuale || '';
    }
    //carica strutture dal session storage
    this.checkSessionStorage();


    //carica il filtro di ricerca dal servizio
    this.searchFilter.filtroRicerca$.subscribe((value) => {
      this.filtro = value;
      this.applySearchFilter();
    });

    //Simone: riceve il booleano dalla navbar e lo usa per inserire una descrizione sull'immagine
    this.textService.isDescriptionActive$.subscribe(value=>{
      this.isDescriptionActive=value;
    })
  }


  //simone
  //creazione del booleano
  isDescriptionActive:boolean=false;

  //al cambiamento del checkbox se false non deve mostare la descrizione altrimenti al passaggio sopra una immagine (hover) deve inviare il valore
  toggleMenu(){
    const dropDownImg  = document.querySelector('.sc-homepage-card-img-text');
    dropDownImg?.classList.toggle('hidden');
  }



  /*
   * Metodo chiamato dal bottone 'applica filtri
   */
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

    /*
    const filtriVuoti =
      this.FiltriDisabilita.length === 0 &&
      this.FiltriTipi.length === 0 &&
      this.FiltriProvince.length === 0;

    if (filtriVuoti) {
      const struttureJSON = sessionStorage.getItem('strutture');
      if (struttureJSON) {
        this.strutture = JSON.parse(struttureJSON);
        this.applySearchFilter();
        return;
      }
    }
    */

    //chiamata API

    this.servizioStruttura
      .getStruttureFiltrate(
        this.FiltriDisabilita,
        this.FiltriTipi,
        this.FiltriProvince
      )
      .subscribe({
        next: (s) => {
          if (s.length === 0) {
            window.alert('Nessuna struttura con questi filtri trovata');
          } else {
            this.strutture = s;
            sessionStorage.setItem('strutture', JSON.stringify(s));
            this.applySearchFilter();
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

  //metodo per cerca le strutture in base al contenuto del "cerca" nella navbar
  private applySearchFilter() {
    if (!this.filtro) {
      this.struttureFiltrate = this.strutture;
    } else {
      const filtroLower = this.filtro.toLowerCase();
      this.struttureFiltrate = this.strutture.filter((s) =>
        s.nomeStruttura.toLowerCase().includes(filtroLower)
      );
    }
  }

  //metodo per conrollare il session storage e salvare se è vuoto
  private checkSessionStorage() {
    const struttureJSON = sessionStorage.getItem('strutture');
    if (struttureJSON && struttureJSON!=='[]') {
      this.strutture = JSON.parse(struttureJSON);
      this.struttureFiltrate = this.strutture;  
      this.applySearchFilter();
    } else {
      this.servizioStruttura.getStrutture().subscribe({
        next: (s) => {
          this.strutture = s;
          this.struttureFiltrate = s;
          sessionStorage.setItem('strutture', JSON.stringify(s));
          this.applySearchFilter();
        } /* gestire l'errore*/,
        error: (err) => {
          console.error(err);
          const riprova = window.confirm(
            'errore nel caricamento delle strutture, riprovare'
          );
          if (riprova) this.checkSessionStorage();
        },
      });
    }
  }
}
/*
toggleMenu() {
    const dropDownMenu = document.querySelector('.sc-navbar-dropdown-menu');
    dropDownMenu?.classList.toggle('hidden');
  }
*/


