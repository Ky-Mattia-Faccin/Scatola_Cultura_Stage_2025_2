import { Component,Renderer2, EventEmitter, HostListener, OnChanges, Output, SimpleChanges, ViewChild,Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchFilterService } from '../../services/search-filter.service';
import { Router, RouterLink } from '@angular/router';

import { TextimgTsService } from '../../services/textimg.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent{
  constructor(public searchService:SearchFilterService, private textService:TextimgTsService,private renderer:Renderer2){}

  //michael

   // Valore della luminosità impostato tramite slider
  brightness!: number;

   // Valore del contrasto impostato tramite slider
  contrast!: number;

  //Valore attuale del textsize : Simone
  fontSize : number = 28;


  // Output: emette il nuovo valore di luminosità verso il componente genitore

  @Output() brightnessChanged = new EventEmitter<number>();

  // Output: emette il nuovo valore di contrasto per il componente genitore
  @Output() contrastChanged = new EventEmitter<number>();


  // Iniezione del servizio SearchFilterService per aggiornare il filtro di ricerca


  // Testo inserito dall'utente nel campo input della barra di ricerca
  FiltroInput!: string;

   /*
   * - Gestisce l’evento di input della barra di ricerca
   * - Recupera il valore digitato
   * - Invia il filtro aggiornato al servizio condiviso
   */
  onInputChange(evento: Event) {
    const target = evento.target as HTMLInputElement;

    this.searchService.setSearchFilter(target.value);
  }


   /*
   * - Mostra o nasconde il menu a discesa (dropdown)
   * - Agisce sull'elemento con classe ‘sc-navbar-dropdown-menu’
   * - Aggiunge/rimuove la classe 'hidden' per gestire la visibilità
   */
  toggleMenu() {
    const dropDownMenu = document.querySelector('.sc-navbar-dropdown-menu');
    dropDownMenu?.classList.toggle('hidden');
  }


  //=====SIMONE======//

  //valore attuale della descrizione per la didascalia delle immagini
  isDescriptionActive: boolean = false;
  onCheck(){
    this.isDescriptionActive=!this.isDescriptionActive;
    this.textService.triggerChange(this.isDescriptionActive);
  }

  /**
   * Simone
   * evento lanciato al cambiamento del checkbox, cambia il font da normale a OpenDyslexic, da dropdown Accessibilità
   * se false lascia quello normale
   * se true imposta il font OpenDyslexic ovunque tramite "styles.css" dalla variabile --fontName 
   * variabili utilizzate:
   *  - isFontActive: boolean = impostato a false, controlla quando il checkbox va a cambiare il valore
   *  - --fontName:va a impostare su styles.css il font scelto
   */
  
  isFontActive : boolean = false;
  onFontCheck(){
    this.isFontActive=!this.isFontActive;
    if(this.isFontActive===true)
      document.documentElement.style.setProperty('--fontName','OpenDyslexic');
    else
      document.documentElement.style.setProperty('--fontName','Verdana');
  }

  /**
   * Simone
   * Evento lanciato al cambiamento del checkbox, cambia il il testo normale a un test più corto e semplice, da dropdown Accessibilità
   * se false lascia il testo normale
   * altrimenti se true imposta il testo semplificato
   * variabili utilizzate : 
   *  -isTextSemplifiedActive : boolean = impostato a false, controlla quando il checkbox va a cambiare il valore
   */
  isTextSemplifiedActive : boolean = false;
  onTextSimplifiedCheck(){
    this.isTextSemplifiedActive=!this.isTextSemplifiedActive;
    this.textService.textSemplifiedChange(this.isTextSemplifiedActive);
  }

  /***
   * Simone
   * Evento lanciato al cambiamento della dimensione del testo, da dropdown Accessibilità.
   * Ottiene il valore e lo imposta sulla variabile CSS: "--font-size"
   */
  textSizeChange(event: Event): void {
    document.documentElement.style.setProperty('--fontSize', this.fontSize.toString() + 'px');
  }

}
