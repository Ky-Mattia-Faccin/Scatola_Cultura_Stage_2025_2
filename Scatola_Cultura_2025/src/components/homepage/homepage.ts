import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Struttura } from '../../interfaces/Istruttura';
import { SearchFilterService } from '../../services/search-filter.service';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
@Component({
  standalone: true,
  selector: 'app-homepage',
  imports: [RouterModule,CommonModule,HttpClientModule],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css'
})
export class Homepage {

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
    this.strutture$.subscribe();
    // Sottoscrizione all’osservabile per aggiornare il filtro di ricerca
    /*
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
    */
  }


  constructor(private httpClient:HttpClient ){}
  strutture$=this.getStrutture();    

  getStrutture():Observable<Struttura[]>{
    return this.httpClient.get<Struttura[]>('http://192.168.123.150:5000/api/Struttura/get');
  }
}

