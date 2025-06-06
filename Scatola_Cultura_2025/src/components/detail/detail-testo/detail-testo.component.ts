import { Component, EventEmitter, Input,  Output } from '@angular/core';
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
export class DetailTestoComponent{

  @Input() testo:string='';
  @Input() accessibilita:DisabilitaStruttura[]|null=null;

  @Output() zoomClicked=new EventEmitter<string>();

  hasAccessibilita:boolean=false;

  constructor(private iconeManager:IconeManager, private sanitizer:DomSanitizer){}
  
  Icone=this.iconeManager
  
  onZoomClick(){
      this.zoomClicked.emit(this.testo)
  }




}
