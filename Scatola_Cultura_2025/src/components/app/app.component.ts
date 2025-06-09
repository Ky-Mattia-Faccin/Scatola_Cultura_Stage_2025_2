import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Homepage } from '../homepage/homepage';
import { Detail } from '../detail/detail';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Detail,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Scatola_Cultura_2025';



  toggleMenu(){
    document.querySelector('sc-navbar-dropdown-menu')?.classList.toggle('hidden');
  }
}
