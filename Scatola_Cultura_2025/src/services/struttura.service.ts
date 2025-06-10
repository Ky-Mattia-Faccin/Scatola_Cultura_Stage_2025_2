import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Struttura } from '../interfaces/Istruttura';
import { HttpClient } from '@angular/common/http';
import { DisabilitaStruttura } from '../interfaces/IDisabilitàStruttura';

@Injectable({
  providedIn: 'root',
})
export class StrutturaService {

  // Iniezione del servizio HttpClient per effettuare richieste HTTP
  constructor(private httpClient: HttpClient) {}

  /*
   * Metodo per ottenere tutte le strutture dal server:
   * - Effettua una GET verso l'API
   * - In caso di errore, cattura l’eccezione e restituisce un array vuoto
  */
  getStrutture(): Observable<Struttura[]> {
    return this.httpClient
      .get<Struttura[]>('http://192.168.123.150:5000/api/Struttura/get')
      .pipe(
        catchError((error) => {
          console.error('Errore nel recupero delle strutture:', error);
          return of([]); // Ritorna un array vuoto in caso di errore
        })
      );
  }

  /*
   * Metodo per ottenere i dati di disabilità di una singola struttura:
   * - Riceve l'ID della struttura come parametro
   * - Restituisce un Observable con i dati delle disabilità
  */
  getDisabilita(id: number): Observable<DisabilitaStruttura[]> {
    return this.httpClient.get<DisabilitaStruttura[]>(
      'http://192.168.123.150:5000/api/Struttura/getById?id=' + `${id}`
    );
  }

  getFiltro(soggetto:string):Observable<string[]>{
     return this.httpClient.get<string[]>(
      'http://192.168.123.150:5000/api/Struttura/get' + `${soggetto}`)
  }




}
