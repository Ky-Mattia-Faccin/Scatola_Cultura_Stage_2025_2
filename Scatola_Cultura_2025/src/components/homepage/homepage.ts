import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Struttura } from '../../interfaces/Istruttura';
import { SearchFilterService } from '../../services/search-filter.service';
import { StrutturaService } from '../../services/struttura.service';
import { FiltriComponent } from '../filtri/filtri.component';

@Component({
  standalone: true,
  selector: 'app-homepage',
  imports: [RouterModule, CommonModule, FiltriComponent],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage implements OnInit {

  
  //michael

  // Iniezione dei servizi:
  // - SearchFilterService per gestire il filtro di ricerca
  // - StrutturaService per recuperare le strutture da API
  constructor(
    private searchFilter: SearchFilterService,
    private servizioStruttura: StrutturaService
  ) {}

   // Lista completa delle strutture ottenute da API
  strutture: Struttura[] = [];

  // Lista filtrata da mostrare nell'interfaccia
  struttureFiltrate: Struttura[] = this.strutture;

  // Valore corrente del filtro testuale (ricerca)
  filtro!: string;

  // Filtri selezionati dai componenti figli (checkbox)
  FiltriDisabilita: string[] = [];
  FiltriTipi: string[] = [];
  FiltriProvince: string[] = [];

    /*
   * ngOnInit:
   * - Recupera tutte le strutture e le salva in localStorage
   * - Applica i filtri iniziali
   * - Ascolta i cambiamenti del filtro testuale
   */
  ngOnInit(): void {
    this.servizioStruttura.getStrutture().subscribe((s) => {
      this.strutture = s;

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
