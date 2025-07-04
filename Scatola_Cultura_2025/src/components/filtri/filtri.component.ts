import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { TypeaheadComponent } from './typeahead/typeahead.component';
import { StrutturaService } from '../../services/struttura.service';
import { Observable, EMPTY, catchError, of, tap } from 'rxjs';
import { ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { TextimgTsService } from '../../services/textimg.service';

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
  constructor(private servizioStruttura: StrutturaService, private textService : TextimgTsService) {}

  // Observable che conterranno i dati da mostrare nei filtri
  DatiDisabilita: Observable<string[]> = EMPTY;
  DatiTipo: Observable<string[]> = EMPTY;
  DatiProvince: Observable<string[]> = EMPTY;

  @ViewChild('disabilitaComp') disabilitaComponent!: TypeaheadComponent;
  @ViewChild('tipoComp') tipoComponent!: TypeaheadComponent;
  @ViewChild('provinciaComp') provinciaComponent!: TypeaheadComponent;

  // Output: emette le selezioni effettuate dagli utentix al componente padre
  @Output() DisabilitaSelected = new EventEmitter<string[]>();
  @Output() TipiSelected = new EventEmitter<string[]>();
  @Output() ProvinceSelected = new EventEmitter<string[]>();

  // Array locali per salvare le selezioni effettuate dagli utenti
  DisabilitaSelectedLocal!: string[];
  TipiSelectedLocal!: string[];
  ProvinceSelectedLocal!: string[];

  // per inizializzare i componenti figli
  ngAfterViewInit(): void {
    this.loadSelections()
  }

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
    return of(JSON.parse(datiSalvati));
  }

  return this.servizioStruttura.getFiltro(nome).pipe(
    tap(val => {
      sessionStorage.setItem(chiave, JSON.stringify(val));
    }),
    catchError(err => {
      const riprova = window.confirm(`Errore nel caricamento del filtro ${nome}. Vuoi riprovare?`);
      if (riprova) {
        return this.loadFilter(nome, chiave);
      }
      return EMPTY;
    })
  );
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


  /**
 * Metodo per resettare tutti i filtri:
 * - Svuota gli array locali delle selezioni
 * - Resetta i componenti figli (TypeaheadComponent)
 * - Emette i nuovi valori vuoti verso il componente padre
 */
  resetFilters() {
      // Svuota le selezioni locali
    this.DisabilitaSelectedLocal = [];
    this.ProvinceSelectedLocal = [];
    this.TipiSelectedLocal = [];

      // Resetta visivamente i componenti Typeahead
    this.disabilitaComponent.reset();
    this.tipoComponent.reset();
    this.provinciaComponent.reset();

      // Emette i nuovi (vuoti) valori al componente padre
    this.applyFilter();
  }


  /**
 * Metodo per caricare le selezioni salvate in precedenza da sessionStorage:
 * - Recupera i dati per ogni filtro
 * - Aggiorna gli array locali
 * - Imposta i valori nei rispettivi componenti figli
 */
  private loadSelections() {
    // Recupera i dati salvati in sessionStorage (se presenti)
  const disabilitaSel = sessionStorage.getItem('filtro-disabilita-selected');
  const tipoSel = sessionStorage.getItem('filtro-tipo-selected');
  const provinceSel = sessionStorage.getItem('filtro-province-selected');

    // Se presenti, aggiorna gli array locali con le selezioni salvate
  this.DisabilitaSelectedLocal = disabilitaSel ? JSON.parse(disabilitaSel) : [];
  this.TipiSelectedLocal = tipoSel ? JSON.parse(tipoSel) : [];
  this.ProvinceSelectedLocal = provinceSel ? JSON.parse(provinceSel) : [];

  // Imposta le selezioni nei rispettivi componenti Typeahead (solo se già inizializzati)
  if(this.disabilitaComponent) this.disabilitaComponent.setSelected(this.DisabilitaSelectedLocal);
  if(this.tipoComponent) this.tipoComponent.setSelected(this.TipiSelectedLocal);
  if(this.provinciaComponent) this.provinciaComponent.setSelected(this.ProvinceSelectedLocal);
  } 
}