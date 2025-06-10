import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Struttura } from '../../interfaces/Istruttura';
import { SearchFilterService } from '../../services/search-filter.service';

@Component({
  standalone: true,
  selector: 'app-homepage',
  imports: [RouterModule, CommonModule],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css'
})
export class Homepage {

  // Iniezione del servizio per la gestione del filtro di ricerca
  constructor(private searchFilter: SearchFilterService) {}

  // Array contenente tutte le strutture caricate
  strutture: Struttura[] = [];

  // Array contenente le strutture filtrate in base al testo di ricerca
  struttureFiltrate: Struttura[] = this.strutture;

  // Testo attuale del filtro di ricerca
  filtro!: string;

  /*
   * OnInit:
   * - Carica le strutture dal localStorage
   * - Sottoscrive l’osservabile filtroRicerca$ per aggiornare la lista filtrata in base al testo inserito
  */
  ngOnInit(): void {
    // Recupero delle strutture salvate nel localStorage
    this.strutture = JSON.parse(localStorage.getItem('strutture') || '[]');

    // Sottoscrizione all’osservabile per aggiornare il filtro di ricerca
    this.searchFilter.filtroRicerca$.subscribe(value => {
      this.filtro = value;

      // Se il filtro è vuoto, mostra tutte le strutture
      if (this.filtro === '')
        this.struttureFiltrate = this.strutture;
      else
        // Filtra le strutture che contengono il testo inserito (case insensitive)
        this.struttureFiltrate = this.strutture.filter(s =>
          s.nome.toLowerCase().includes(this.filtro.toLowerCase())
        );
    });
  }

}
