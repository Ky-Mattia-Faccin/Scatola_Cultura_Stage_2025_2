import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ImmagineDTO, Struttura } from '../interfaces/Istruttura';
import { HttpClient } from '@angular/common/http';
import { Disabilita } from '../interfaces/Istruttura';

@Injectable({
  providedIn: 'root',
})
export class StrutturaService {
  //michael

  // Iniezione del servizio HttpClient per effettuare richieste HTTP
  constructor(private httpClient: HttpClient, private http:HttpClient) {}


  baseUrl='https://dev.api.scatolacultura.it/api';

  strutture: Struttura[] = [];
  /**
   * Recupera tutte le strutture dal backend.
   * Endpoint: /api/DisabilitaStruttura/get
   * Restituisce un Observable con array di oggetti Struttura.
   * In caso di errore, stampa l'errore e ritorna un array vuoto per evitare crash.
   */
  getStrutture(): Observable<Struttura[]> {
    return this.httpClient
      .get<Struttura[]>(
        `${this.baseUrl}/DisabilitaStruttura/get`
      ).pipe(
        catchError((error) => {
          console.error('Errore nel recupero delle strutture:', error);
          return of([]); // Ritorna un array vuoto in caso di errore
        })
      )
  }

  /*
   * Recupera i dati di disabilità di una struttura specifica:
   * - Riceve come parametro l'ID della struttura
   * - Restituisce un Observable con i dati delle disabilità associati a quella struttura
   * - da decidere su utilizzare o no
   */

  getDisabilitàStruttura(id: number): Observable<any[]> {
    return this.httpClient
      .get<any[]>(
        `${this.baseUrl}/DisabilitaStruttura/getByID/${id}`
      )
      .pipe(
        catchError((error) => {
          console.error('Errore nel recupero delle disabilità:', error);
          return of([]);
        })
      );
  }

  /*
   * Metodo generico per ottenere filtri dinamici dal backend.
   * Se il soggetto è 'Disabilita' chiama l'endpoint corrispondente, altrimenti chiama l'endpoint generico struttura.
   */ 
  getFiltro(soggetto: string): Observable<string[]> {
    let ret;

    if (soggetto === 'Disabilita')
      ret = this.httpClient.get<string[]>(
        `${this.baseUrl}/Disabilita/get${soggetto}`
      );
    else
      ret = this.httpClient.get<string[]>(
        `${this.baseUrl}/Struttura/get${soggetto}`
      );

    return ret;
  }

  /**
   * Restituisce le strutture filtrate in base ai filtri selezionati dall'utente.
   * - Costruisce dinamicamente una query string con parametri multipli per:
   *    - Disabilità
   *    - Province
   *    - Ambiti (tipi)
   * */

  getStruttureFiltrate(
    FiltriDisabilita: string[],
    FiltriAmbito: string[],
    FiltriProvince: string[]
  ): Observable<Struttura[]> {
  

    let url = `${this.baseUrl}/DisabilitaStruttura/get?`;

    // Aggiunge i parametri della query per ogni filtro selezionato (con encoding)
    if (FiltriDisabilita?.length > 0 && !!FiltriDisabilita)
      FiltriDisabilita.forEach((value: string) => {
        url += `Disabilita=${encodeURIComponent(value)}&`;
      });

    if (FiltriProvince?.length > 0 && !!FiltriProvince)
      FiltriProvince.forEach((value: string) => {
        url += `Province=${encodeURIComponent(value)}&`;
      });

    if (FiltriAmbito?.length > 0 && !!FiltriAmbito)
      FiltriAmbito.forEach((value) => {
        url += `Tipo=${encodeURIComponent(value)}&`;
      });

    // Rimuove eventuale & finale dalla URL
    if (url.endsWith('&')) {
      url = url.slice(0, -1);
    }
    
    // Esegue la chiamata GET e restituisce le strutture corrispondenti
    return this.httpClient.get<Struttura[]>(url);
  }
}
