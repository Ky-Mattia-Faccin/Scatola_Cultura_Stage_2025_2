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
  fontSize! : number;


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

  //valore attuale della descrizione
  isDescriptionActive: boolean = false;
  onCheck(){
    this.isDescriptionActive=!this.isDescriptionActive;
    this.textService.triggerChange(this.isDescriptionActive);
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
