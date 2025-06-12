import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Struttura } from '../interfaces/Istruttura';
import { HttpClient } from '@angular/common/http';
import { DisabilitaStruttura } from '../interfaces/IDisabilitàStruttura';

@Injectable({
  providedIn: 'root',
})
export class StrutturaService {

  //michael


  // Iniezione del servizio HttpClient per effettuare richieste HTTP
  constructor(private httpClient: HttpClient) {}

  /*
   * Recupera tutte le strutture dal server tramite GET:
   * - Effettua la richiesta all'endpoint API specificato
   * - In caso di errore stampa l'errore su console e restituisce un array vuoto per non bloccare l'app
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
   * Recupera i dati di disabilità di una struttura specifica:
   * - Riceve come parametro l'ID della struttura
   * - Restituisce un Observable con i dati delle disabilità associati a quella struttura
   * - da decidere su utilizzare o no
   */
  getDisabilita(id: number): Observable<DisabilitaStruttura[]> {
    return this.httpClient.get<DisabilitaStruttura[]>(
      'http://192.168.123.150:5000/api/Struttura/getById?id=' + `${id}`
    );
  }

  /*
   * Metodo per ottenere i filtri
   * - Riceve una stringa 'soggetto'
   * - Esegue una chiamata GET per ottenere un array di stringhe corrispondenti
   */
  getFiltro(soggetto:string):Observable<string[]>{
    let ret

    if(soggetto==='Disabilita')
       ret=this.httpClient.get<string[]>('http://192.168.123.150:5000/api/Disabilita/get' + `${soggetto}`);
    else
      ret=this.httpClient.get<string[]>('http://192.168.123.150:5000/api/StrutturaTB/get' + `${soggetto}`);

    return ret
  }




}
