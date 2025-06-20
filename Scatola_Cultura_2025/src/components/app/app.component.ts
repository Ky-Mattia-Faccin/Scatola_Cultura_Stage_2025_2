import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { Struttura } from '../../interfaces/Istruttura';
import {  Observable} from 'rxjs';
import { SearchFilterService } from '../../services/search-filter.service';
import { HttpClient } from '@angular/common/http';
import {  slideAnimation } from './route-transition';
import { StrutturaService } from '../../services/struttura.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavBarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[slideAnimation]
})
export class AppComponent {

  //michael

  // Titolo dell'applicazione
  title = 'Scatola_Cultura_2025';

  // Valori dei filtri di luminosità e contrasto (di default 100%), valore di text size (Default:18)
  brightness: number = 100;
  contrast: number = 100; 

  // Array per contenere le strutture caricate dal file JSON/localStorage
  strutture: Struttura[] = [];

  // Iniezione del servizio HttpClient per effettuare richieste HTTP
  //iniezione del servizio ActivatedRoute per conoscere la rotta attiva (utilizzato per l'animazione)
  constructor(private httpClient: HttpClient, protected route:ActivatedRoute,private servizioStruttura:StrutturaService) {}

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
