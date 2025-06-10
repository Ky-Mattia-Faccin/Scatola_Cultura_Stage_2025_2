import { Component, OnInit } from '@angular/core';
import {  RouterOutlet } from '@angular/router';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { Struttura } from '../../interfaces/Istruttura';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {  Observable} from 'rxjs';
import { StrutturaService } from '../../services/struttura.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, HttpClientModule],
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
    // Recupero delle strutture salvate nel localStorage
    this.strutture = JSON.parse(localStorage.getItem('strutture') || '[]');
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
