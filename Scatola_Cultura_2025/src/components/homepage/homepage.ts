import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Struttura } from '../../interfaces/Istruttura';
import { SearchFilterService } from '../../services/search-filter.service';
import { StrutturaService } from '../../services/struttura.service';

@Component({
  standalone: true,
  selector: 'app-homepage',
  imports: [RouterModule, CommonModule],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css'
})
export class Homepage implements OnInit {

  // Iniezione dei servizi:
  // - SearchFilterService per gestire il filtro di ricerca
  // - StrutturaService per recuperare le strutture da API
  constructor(
    private searchFilter: SearchFilterService,
    private servizioStruttura: StrutturaService
  ) {}

  // Array contenente tutte le strutture caricate da API
  strutture: Struttura[] = [];

  // Array delle strutture filtrate da visualizzare
  struttureFiltrate: Struttura[] = this.strutture;

  // Testo attuale del filtro di ricerca
  filtro!: string;

  /*
   * OnInit:
   * - Recupera i dati delle strutture dal servizio (chiamata API)
   * - Li salva nel localStorage in formato JSON
   * - Applica il filtro iniziale (se presente)
   * - Sottoscrive al filtroRicerca$ per aggiornare la lista filtrata dinamicamente
  */
  ngOnInit(): void {
    this.servizioStruttura.getStrutture().subscribe(s => {
      this.strutture = s;

      const struttureJSON = JSON.stringify(this.strutture);
      console.log(struttureJSON);

      localStorage.setItem('strutture', struttureJSON);

      this.filtraStrutture(); // Applica filtro iniziale
    });

    // Ascolta le modifiche al filtro di ricerca ed aggiorna la lista filtrata
    this.searchFilter.filtroRicerca$.subscribe(value => {
      this.filtro = value;
      this.filtraStrutture(); // Ricalcola l’elenco filtrato
    });
  }

  /*
   * Metodo privato per filtrare le strutture in base al testo del filtro:
   * - Se il filtro è vuoto, mostra tutte le strutture
   * - Altrimenti, filtra per nomeStruttura (case insensitive)
  */
  private filtraStrutture(): void {
    this.struttureFiltrate = this.filtro === ''
      ? this.strutture
      : this.strutture.filter(s =>
          s.nomeStruttura.toLowerCase().includes(this.filtro.toLowerCase())
        );
  }
}
