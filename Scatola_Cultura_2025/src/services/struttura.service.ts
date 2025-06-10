import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Struttura } from '../interfaces/Istruttura';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DisabilitaStruttura } from '../interfaces/IDisabilitàStruttura';

@Injectable({
  providedIn: 'root',
})
export class StrutturaService {
  constructor(private httpClient: HttpClient) {}

  getStrutture(): Observable<Struttura[]> {
    return this.httpClient
      .get<Struttura[]>('http://192.168.123.150:5000/api/Struttura/get')
      .pipe(
        catchError((error) => {
          console.error('Errore nel recupero delle strutture:', error);
          return of([]); // restituisce un array vuoto in caso di errore
        })
      );
  }

  //seconda chiamata per ricevere le disabilità della singola struttura
  getDisabilita(id: number): Observable<DisabilitaStruttura[]> {
    return this.httpClient.get<DisabilitaStruttura[]>(
      'http://192.168.123.150:5000/api/Struttura/getById?id=' + `${id}`
    );
  }
}
