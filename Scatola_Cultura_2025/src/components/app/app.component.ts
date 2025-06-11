import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { Struttura } from '../../interfaces/Istruttura';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule,NavBarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //michael

  // Titolo dell'applicazione
  title = 'Scatola_Cultura_2025';

  // Valori dei filtri di luminosità e contrasto (di default 100%)
  brightness: number = 100;
  contrast: number = 100;

  // Array per contenere le strutture caricate dal file JSON/localStorage
  strutture: Struttura[] = [];

  // Iniezione del servizio HttpClient per effettuare richieste HTTP
  constructor(private httpClient: HttpClient) {}

  /*
   * OnInit:
   * - Carica le strutture dal localStorage
  */
  ngOnInit(): void {
    this.strutture = JSON.parse(localStorage.getItem('strutture') || '[]');
  }

  /*
   * Applica i filtri di luminosità e contrasto alla pagina:
   * - Seleziona l'elemento con classe 'sc-pagina'
   * - Imposta i valori CSS filter in base ai controlli utente
  */
  applyFilter() {
    const pagina = document.querySelector('.sc-pagina') as HTMLElement;

    if (pagina) {
      pagina.style.filter = `brightness(${this.brightness}%) contrast(${this.contrast}%) `;
    }
  }

}
