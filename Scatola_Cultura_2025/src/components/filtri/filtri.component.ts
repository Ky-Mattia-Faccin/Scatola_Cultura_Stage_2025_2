import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { TypeaheadComponent } from './typeahead/typeahead.component';
import { StrutturaService } from '../../services/struttura.service';
import { Observable, EMPTY, catchError, of } from 'rxjs';
import { ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-filtri',
  standalone: true,
  imports: [TypeaheadComponent],
  templateUrl: './filtri.component.html',
  styleUrl: './filtri.component.css',
})
export class FiltriComponent implements AfterViewInit {
  //michael

  // Iniezione del servizio per recuperare i dati dei filtri
  constructor(private servizioStruttura: StrutturaService) {}

  // Observable che conterranno i dati da mostrare nei filtri
  DatiDisabilita: Observable<string[]> = EMPTY;
  DatiTipo: Observable<string[]> = EMPTY;
  DatiProvince: Observable<string[]> = EMPTY;

  @ViewChild('disabilitaComp') disabilitaComponent!: TypeaheadComponent;
  @ViewChild('tipoComp') tipoComponent!: TypeaheadComponent;
  @ViewChild('provinciaComp') provinciaComponent!: TypeaheadComponent;

  // Output: emette le selezioni effettuate dagli utenit al componente padre
  @Output() DisabilitaSelected = new EventEmitter<string[]>();
  @Output() TipiSelected = new EventEmitter<string[]>();
  @Output() ProvinceSelected = new EventEmitter<string[]>();

  // Array locali per salvare le selezioni effettuate dagli utenti
  DisabilitaSelectedLocal!: string[];
  TipiSelectedLocal!: string[];
  ProvinceSelectedLocal!: string[];

  // per inizializzare i componenti figli
  ngAfterViewInit(): void {}

  /*
   * Metodi per ottenere i dati dei vari filtri
   * Vengono chiamati al focus sul rispettivo campo
   */

  getDatiDisabilita(nome: string) {
    this.DatiDisabilita = this.loadFilter(nome, 'filtro-disabilita');
  }

  getDatiTipo(nome: string) {
    this.DatiTipo = this.loadFilter(nome, 'filtro-tipo');
  }

  getDatiProvince(nome: string) {
    this.DatiProvince = this.loadFilter(nome, 'filtro-province');
  }



  /**
   * Metodo generico per caricare un filtro.
   * Se i dati sono già presenti in sessionStorage, li usa direttamente.
   * Altrimenti li recupera dal servizio, con gestione errori.
   */
  private loadFilter(nome: string, chiave: string): Observable<string[]> {
    const datiSalvati = sessionStorage.getItem(chiave);
    if (datiSalvati) {
      // Ritorna i dati salvati localmente
      return of(JSON.parse(datiSalvati));
    }

    // Recupera i dati dal servizio
    const obs = this.servizioStruttura.getFiltro(nome).pipe(
      catchError((err) => {
        const riprova = window.confirm(
          `Errore nel caricamento del filtro ${nome}. Vuoi riprovare?`
        );
        if (riprova) {
          // Mappa i nomi ai rispettivi metodi
          const retryMap: Record<string, () => void> = {
            disabilita: () => this.getDatiDisabilita(nome),
            tipo: () => this.getDatiTipo(nome),
            province: () => this.getDatiProvince(nome),
          };
           // Se esiste un metodo di retry, lo esegue
          if (retryMap[nome]) retryMap[nome]();
        }
        return EMPTY;
      })
    );

    // Salva i dati in sessionStorage una volta ricevuti
    obs.subscribe((val) => {
      sessionStorage.setItem(chiave, JSON.stringify(val));
    });

    return obs;
  }

  /*
   * Metodi per aggiornare i valori locali dei filtri selezionati
   */

  setDisabilitaSelected(array: string[]) {
    this.DisabilitaSelectedLocal = array;
  }

  setTipiSelected(array: string[]) {
    this.TipiSelectedLocal = array;
  }

  setProvinceSelected(array: string[]) {
    this.ProvinceSelectedLocal = array;
  }

  /*
   * Metodo per applicare tutti i filtri:
   * emette i valori locali aggiornati verso il componente padre
   */
  applyFilter() {
    this.DisabilitaSelected.emit(this.DisabilitaSelectedLocal);
    this.TipiSelected.emit(this.TipiSelectedLocal);
    this.ProvinceSelected.emit(this.ProvinceSelectedLocal);
  }

  resetFilters() {
    this.DisabilitaSelectedLocal = [];
    this.ProvinceSelectedLocal = [];
    this.TipiSelectedLocal = [];

    this.disabilitaComponent.reset();
    this.tipoComponent.reset();
    this.provinciaComponent.reset();

    this.applyFilter();
  }
}
