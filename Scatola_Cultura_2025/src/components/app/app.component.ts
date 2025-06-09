import { Component, OnInit } from '@angular/core';
import {  RouterOutlet } from '@angular/router';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { Struttura } from '../../interfaces/Istruttura';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {  Observable} from 'rxjs';

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
  // Iniezione del servizio HttpClient per effettuare richieste HTTP
  /*
   * OnInit:
   * - Carica i dati delle strutture dal file JSON
   * - Li salva nel localStorage per l'utilizzo successivo
  */

  constructor(private httpClient:HttpClient ){}
  strutture:Struttura[]=[];
  strutture$: Observable<Struttura[]> = this.getStrutture();
  
  ngOnInit(): void {
    this.strutture$.subscribe();
    this.getStrutture().subscribe(dati=>{

    });
  }


  // Metodo per ottenere le strutture dal file JSON locale
   getStrutture():Observable<Struttura[]>{
    return this.httpClient.get<Struttura[]>('http://192.168.123.150:5000/api/Struttura/get');
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
