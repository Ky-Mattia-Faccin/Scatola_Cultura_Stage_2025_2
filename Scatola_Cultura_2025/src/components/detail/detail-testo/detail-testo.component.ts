import { Component, EventEmitter, Input,  OnChanges,  Output, SimpleChanges } from '@angular/core';
import { IconeManager } from '../../../services/IconeManager';
import { DisabilitaStruttura } from '../../../interfaces/IDisabilitàStruttura';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-testo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-testo.component.html',
  styleUrl: './detail-testo.component.css'
})
export class DetailTestoComponent implements OnChanges{

  // Flag per indicare se il componente genitore ha la classe 'zoomed'
  parentHasZoomClass = false;

  // Input: testo da visualizzare
  @Input() testo:string='';

   // Input: array di oggetti DisabilitaStruttura per indicare eventuali accessibilità
  @Input() accessibilita:DisabilitaStruttura[]|null=null;

  // Output: emette l'elemento genitore (container) quando viene cliccato il pulsante di zoom
  @Output() zoomClicked=new EventEmitter<HTMLElement>();

  // Flag per indicare se ci sono dati di accessibilità
  hasAccessibilita:boolean=false;

   // Iniezione delle dipendenze: gestore icone, sanitizer HTML
  constructor(private iconeManager:IconeManager, private sanitizer:DomSanitizer,
  ){}



   // OnChanges: aggiorna il flag 'hasAccessibilita' se cambiano i dati in ingresso

  ngOnChanges(changes: SimpleChanges): void {
    this.hasAccessibilita=!!(this.accessibilita && this.accessibilita.length>0);

    
  }
  


  Icone=this.iconeManager
  

   // Handler per il click sul pulsante zoom: trova il container e lo emette
  onZoomClick(event:MouseEvent){
    let parent=(event.target as HTMLElement).closest('.sc-detail-testo-container');
    this.zoomClicked.emit(parent as HTMLElement)
    this.parentHasZoomClass=!this.parentHasZoomClass
  }




}
