import { Component, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {

 brightness!:number
 contrast!:number

 
 @Output() brightnessChanged = new EventEmitter<number>();
 @Output() contrastChanged = new EventEmitter<number>();
  
  toggleMenu() {
    const dropDownMenu = document.querySelector('.sc-navbar-dropdown-menu');
    dropDownMenu?.classList.toggle('hidden');
  }

  applyFilter(){

  }
  

}
