import { Component, EventEmitter, Input,  OnChanges,  Output, SimpleChanges } from '@angular/core';
import { IconeManager } from '../IconeManager';
import { DisabilitaStruttura } from '../../../interfaces/IDisabilitàStruttura';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-testo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-testo.component.html',
  styleUrl: './detail-testo.component.css'
})
export class DetailTestoComponent implements OnChanges{

  @Input() testo:string='';
  @Input() accessibilita:DisabilitaStruttura[]|null=null;

  @Output() zoomClicked=new EventEmitter<HTMLElement>();

  hasAccessibilita:boolean=false;

  constructor(private iconeManager:IconeManager, private sanitizer:DomSanitizer){}
  ngOnChanges(changes: SimpleChanges): void {
    this.hasAccessibilita=!!(this.accessibilita && this.accessibilita.length>0);
  }
  
  Icone=this.iconeManager
  
  onZoomClick(event:MouseEvent){
    let parent=(event.target as HTMLElement).closest('.sc-detail-testo-container');
    this.zoomClicked.emit(parent as HTMLElement)
  }




}
