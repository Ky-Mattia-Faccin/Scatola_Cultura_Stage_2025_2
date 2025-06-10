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
export class Homepage  implements OnInit{

  // Iniezione del servizio per la gestione del filtro di ricerca
  constructor(private searchFilter: SearchFilterService,private servizioStruttura:StrutturaService) {}

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
    
    this.servizioStruttura.getStrutture().subscribe(s=>{
      this.strutture=s
      const struttureJSON=JSON.stringify(this.strutture)
      console.log(struttureJSON);
      localStorage.setItem('strutture',struttureJSON)
      this.filtraStrutture()
    })

    // Sottoscrizione all’osservabile per aggiornare il filtro di ricerca
    this.searchFilter.filtroRicerca$.subscribe(value => {
      this.filtro = value;
      this.filtraStrutture()
    });
  }
  private filtraStrutture(): void {
    this.struttureFiltrate = this.filtro === ''
      ? this.strutture
      : this.strutture.filter(s =>
          s.nomeStruttura.toLowerCase().includes(this.filtro.toLowerCase())
        );
  }

}
