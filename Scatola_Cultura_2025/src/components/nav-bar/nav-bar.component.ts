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

  // Valore della luminosità (impostato dall’utente)
  brightness!: number;

  // Valore del contrasto (impostato dall’utente)
  contrast!: number;

  // Output: emette il nuovo valore di luminosità verso il componente genitore
  @Output() brightnessChanged = new EventEmitter<number>();

  // Output: emette il nuovo valore di contrasto verso il componente genitore
  @Output() contrastChanged = new EventEmitter<number>();

  // Iniezione del servizio SearchFilterService per aggiornare il filtro di ricerca
  constructor(public searchService: SearchFilterService) {}

  // Testo attualmente inserito nel campo di ricerca
  FiltroInput!: string;

  /*
   * Handler per la modifica dell'input di ricerca:
   * - Estrae il valore dal campo input
   * - Aggiorna il filtro nel SearchFilterService
   */
  onInputChange(evento: Event) {
    const target = evento.target as HTMLInputElement;

    this.searchService.setSearchFilter(target.value);
  }

  /*
   * Metodo per mostrare/nascondere il menu a discesa:
   * - Seleziona l’elemento con classe ‘sc-navbar-dropdown-menu’
   * - Alterna la classe ‘hidden’ per mostrarlo o nasconderlo
   */
  toggleMenu() {
    const dropDownMenu = document.querySelector('.sc-navbar-dropdown-menu');
    dropDownMenu?.classList.toggle('hidden');
  }
}
