import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Homepage } from '../homepage/homepage';
import { Detail } from '../detail/detail';
import { RouterLink } from '@angular/router';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { Struttura } from '../../interfaces/Istruttura';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, map, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Detail, RouterLink, NavBarComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  // Titolo dell'applicazione
  title = 'Scatola_Cultura_2025';

  // Valori dei filtri di luminosità e contrasto (di default 100%)
  brightness: number = 100;
  contrast: number = 100;

  // Array per contenere le strutture caricate dal file JSON
  strutture: Struttura[] = [];

  // Iniezione del servizio HttpClient per effettuare richieste HTTP
  constructor(private httpClient: HttpClient) {}

  /*
   * OnInit:
   * - Carica i dati delle strutture dal file JSON
   * - Li salva nel localStorage per l'utilizzo successivo
  */
  ngOnInit(): void {
    this.getStrutture().subscribe(dati => {
      this.strutture = dati;

      // Serializzazione in JSON e salvataggio nel localStorage
      const strutturaJson = JSON.stringify(this.strutture);
      if (strutturaJson != null)
        localStorage.setItem('strutture', strutturaJson);
    });
  }

  // Metodo per ottenere le strutture dal file JSON locale
  getStrutture(): Observable<Struttura[]> {
    return this.httpClient.get<Struttura[]>('./assets/struttura.json');
  }

  /*
   * Applica i filtri di luminosità e contrasto alla pagina:
   * - Seleziona l'elemento con classe 'sc-pagina'
   * - Imposta i valori CSS in base ai controlli utente
  */
  applyFilter() {
    const pagina = document.querySelector('.sc-pagina') as HTMLElement;

    if (pagina) {
      pagina.style.filter = `brightness(${this.brightness}%) contrast(${this.contrast}%)`;
    }
  }

}
