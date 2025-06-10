import { Component, EventEmitter, HostListener, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchFilterService } from '../../services/search-filter.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {

  //michael

   // Valore della luminosità impostato tramite slider
  brightness!: number;

   // Valore del contrasto impostato tramite slider
  contrast!: number;

  // Output: emette il nuovo valore di luminosità per il componente genitore
  @Output() brightnessChanged = new EventEmitter<number>();

  // Output: emette il nuovo valore di contrasto per il componente genitore
  @Output() contrastChanged = new EventEmitter<number>();


  // Iniezione del servizio SearchFilterService per aggiornare il filtro di ricerca
  constructor(public searchService: SearchFilterService) {}

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
}
