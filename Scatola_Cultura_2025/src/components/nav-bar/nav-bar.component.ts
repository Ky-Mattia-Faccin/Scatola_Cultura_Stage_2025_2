import { Component, EventEmitter, HostListener, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchFilterService } from '../../services/search-filter.service';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {

  // Valore attuale della luminosità (impostato dall’utente)
  brightness!: number;

  // Valore attuale del contrasto (impostato dall’utente)
  contrast!: number;

  // Output: emette il nuovo valore di luminosità verso il componente genitore
  @Output() brightnessChanged = new EventEmitter<number>();

  // Output: emette il nuovo valore di contrasto verso il componente genitore
  @Output() contrastChanged = new EventEmitter<number>();


  constructor(public searchService:SearchFilterService){}

  FiltroInput!:string

  onInputChange(evento:Event){
    const target=evento.target as HTMLInputElement
    
    this.searchService.setSearchFilter(target.value)
    console.log(target.value)
  }



  //Metodo per mostrare/nascondere il menu a discesa
  toggleMenu() {
    const dropDownMenu = document.querySelector('.sc-navbar-dropdown-menu');
    dropDownMenu?.classList.toggle('hidden');
  }

}
