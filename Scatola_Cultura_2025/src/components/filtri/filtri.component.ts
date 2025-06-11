import { Component, EventEmitter, Output } from '@angular/core';
import { TypeaheadComponent } from './typeahead/typeahead.component';
import { StrutturaService } from '../../services/struttura.service';
import { Observable, EMPTY } from 'rxjs';

@Component({
  selector: 'app-filtri',
  standalone: true,
  imports: [TypeaheadComponent],
  templateUrl: './filtri.component.html',
  styleUrl: './filtri.component.css',
})
export class FiltriComponent {
  constructor(private servizioStruttura: StrutturaService) {}

  DatiDisabilita: Observable<string[]> = EMPTY;
  DatiTipo: Observable<string[]> = EMPTY;
  DatiProvince: Observable<string[]> = EMPTY;

  //output degli array dei filtri
  @Output() DisabilitaSelected = new EventEmitter<string[]>();
  @Output() TipiSelected = new EventEmitter<string[]>();
  @Output() ProvinceSelected = new EventEmitter<string[]>();

  //array locali che contengono i filtri selezionati
  DisabilitaSelectedLocal!: string[];
  TipiSelectedLocal!: string[];
  ProvinceSelectedLocal!: string[];

  getDatiDisabilita(nome: string) {
    this.DatiDisabilita = this.servizioStruttura.getFiltro(nome);
  }
  getDatiTipo(nome: string) {
    this.DatiTipo = this.servizioStruttura.getFiltro(nome);
  }
  getDatiProvince(nome: string) {
    this.DatiProvince = this.servizioStruttura.getFiltro(nome);
  }

  setDisabilitaSelected(array: string[]) {
    this.DisabilitaSelectedLocal = array;
  }

  setTipiSelected(array: string[]) {
    this.TipiSelectedLocal = array;
  }

  setProvinceSelected(array: string[]) {
    this.ProvinceSelectedLocal = array;
  }

  applyFilter() {
    this.DisabilitaSelected.emit(this.DisabilitaSelectedLocal);
    this.TipiSelected.emit(this.TipiSelectedLocal);
    this.ProvinceSelected.emit(this.ProvinceSelectedLocal);
  }
}
