import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconeManager } from '../IconeManager';

@Component({
  selector: 'app-detail-testo',
  standalone: true,
  imports: [],
  templateUrl: './detail-testo.component.html',
  styleUrl: './detail-testo.component.css'
})
export class DetailTestoComponent {

  @Input() testo:string='';

  @Output() zoomClicked=new EventEmitter<string>();

  constructor(private iconeManager:IconeManager){}

  Icone=this.iconeManager
  
  onZoomClick(){
    this.zoomClicked.emit(this.testo)
  }



}
