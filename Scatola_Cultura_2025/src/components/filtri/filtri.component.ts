import { Component } from '@angular/core';
import { TypeaheadComponent } from './typeahead/typeahead.component';
import { StrutturaService } from '../../services/struttura.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-filtri',
  standalone: true,
  imports: [TypeaheadComponent],
  templateUrl: './filtri.component.html',
  styleUrl: './filtri.component.css',
})
export class FiltriComponent {

  constructor(private servizioStruttura: StrutturaService) {}

  DatiRicevuti!: Observable<string[]>;


  getDati(nome: string) {
    console.log(nome);
    this.DatiRicevuti = this.servizioStruttura.getFiltro(nome);
  }
}
