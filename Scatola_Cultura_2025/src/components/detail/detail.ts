import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Struttura } from '../../interfaces/Istruttura';

@Component({
  standalone: true,
  selector: 'app-detail',
  imports: [RouterModule, RouterLink, CommonModule],
  templateUrl: './detail.html',
  styleUrls: ['./detail.css'],
})
export class Detail {
  @Input() struttura!: Struttura;
}
