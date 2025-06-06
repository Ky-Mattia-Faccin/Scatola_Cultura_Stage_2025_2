import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Homepage } from '../homepage/homepage';
import { Detail } from '../detail/detail';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Homepage, Detail],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Scatola_Cultura_2025';
}
