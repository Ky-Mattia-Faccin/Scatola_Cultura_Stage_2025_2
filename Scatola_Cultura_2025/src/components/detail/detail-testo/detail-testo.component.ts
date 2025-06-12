import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { IconeManager } from '../../../services/IconeManager';
import { CommonModule } from '@angular/common';
import { Struttura } from '../../../interfaces/Istruttura';
import { SearchFilterService } from '../../../services/search-filter.service';


@Component({
  selector: 'app-detail-testo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-testo.component.html',
  styleUrl: './detail-testo.component.css'
})
export class DetailTestoComponent implements OnChanges {


  //michael 

  // Flag per indicare se il container genitore ha la classe 'zoomed'
  parentHasZoomClass = false;

  // Input: testo da visualizzare nel componente
  @Input() testo: string = '';

  // Input: struttura per cui mostrare eventuali dati di accessibilità/disabilità
  @Input() struttura: Struttura | null = null;

  // Output: emette l'elemento container genitore quando viene cliccato il pulsante zoom
  @Output() zoomClicked = new EventEmitter<HTMLElement>();

  // Flag per indicare se esistono dati di accessibilità (struttura non nulla)
  hasAccessibilita: boolean = false;

   // Iniezione delle dipendenze: gestore icone
  constructor(private iconeManager:IconeManager,private searchFilter: SearchFilterService
  ){}



   // OnChanges: aggiorna il flag 'hasAccessibilita' se cambiano i dati in ingresso


  /*
   * Metodo OnChanges:
   * Viene chiamato quando cambiano gli Input
   * aggiorna il flag hasAccessibilita in base alla presenza o meno di struttura
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.hasAccessibilita = !!this.struttura;
  }

  // Accesso alle icone tramite IconeManager
  Icone = this.iconeManager;

  /*
   * Gestore evento click sul pulsante zoom
   * Trova il container genitore (.sc-detail-testo-container) e lo emette con zoomClicked
   * Inoltre inverte il flag parentHasZoomClass per aggiornare la UI in base allo stato zoom
   */
  onZoomClick(event: MouseEvent) {
    let parent = (event.target as HTMLElement).closest('.sc-detail-testo-container');
    this.zoomClicked.emit(parent as HTMLElement);
    this.parentHasZoomClass = !this.parentHasZoomClass;
  }


  //=====SIMONE=====//
  //prende il valore di text size
  textSize !:number;
  ngOnInit(): void {
    this.searchFilter.textSize$.subscribe(value=>{
      this.textSize = value;
  })
}
}