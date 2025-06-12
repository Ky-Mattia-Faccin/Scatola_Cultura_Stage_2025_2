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

  // Iniezione dei servizi:
  // - SearchFilterService per gestire il filtro di ricerca
  // - StrutturaService per recuperare le strutture da API
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
   * - Recupera tutte le strutture e le salva in localStorage
   * - Applica i filtri iniziali
   * - Ascolta i cambiamenti del filtro testuale
   */

  // Grandezza testo
  textSize!: number;

  /*
   * OnInit:
   * - Carica le strutture dal localStorage
   * - Sottoscrive l’osservabile filtroRicerca$ per aggiornare la lista filtrata in base al testo inserito
  */
  ngOnInit(): void {
    //Simone: riceve il booleano dalla navbar e lo usa per inserire una descrizione sull'immagine
    this.textService.isDescriptionActive$.subscribe(value=>{
      this.isDescriptionActive=value;
      }
    )

    this.servizioStruttura.getStrutture().subscribe((s) => {
      this.strutture = s;
    
    
  // Recupero delle strutture salvate nel localStorage

    this.strutture = JSON.parse(localStorage.getItem('strutture') || '[]');


      const struttureJSON = JSON.stringify(this.strutture);

      localStorage.setItem('strutture', struttureJSON);

      this.filtraStrutture(); 
    });

    // Ascolta le modifiche al filtro di ricerca ed aggiorna la lista filtrata
    this.searchFilter.filtroRicerca$.subscribe((value) => {
      this.filtro = value;
      this.filtraStrutture(); 
    });
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
   * Metodo principale per filtrare la lista delle strutture:
   * - Applica il filtro di testo (ricerca)
   * - Applica i filtri checkbox (ambito, disabilità, provincia)
   */
  filtraStrutture(): void {

    this.struttureFiltrate =
      this.filtro === ''
        ? this.strutture
        : this.strutture.filter((s) =>
            s.nomeStruttura.toLowerCase().includes(this.filtro.toLowerCase())
          );
    
     // Filtro per provincia
    if (this.FiltriProvince && this.FiltriProvince.length > 0) {
      this.struttureFiltrate = this.struttureFiltrate.filter((s) =>
        this.FiltriProvince.includes(s.provincia)
      );
    }
     // Filtro per disabilità
    if (this.FiltriDisabilita && this.FiltriDisabilita.length > 0) {
      this.struttureFiltrate = this.struttureFiltrate.filter((s) =>
        s.disabilita.some((d) => this.FiltriDisabilita.includes(d.categoria))
      );
    }
     // Filtro per ambito/tipo
    if (this.FiltriTipi && this.FiltriTipi.length > 0) {
      this.struttureFiltrate = this.struttureFiltrate.filter((s) =>
        this.FiltriTipi.includes(s.ambito)
      );
    }
    

    
  }
}
/*
toggleMenu() {
    const dropDownMenu = document.querySelector('.sc-navbar-dropdown-menu');
    dropDownMenu?.classList.toggle('hidden');
  }
*/


