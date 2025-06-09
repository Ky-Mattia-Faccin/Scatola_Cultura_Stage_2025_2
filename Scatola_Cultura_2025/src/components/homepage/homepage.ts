import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone:true,
  selector: 'app-homepage',
  imports: [RouterModule,CommonModule],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css'
})

export class Homepage {
  items = [
    {nome: 'Musei Vaticani - Città del Vaticano', immagine: 'assets/prova.avif'},
    {nome: 'Galleria degli Uffizi - Firenze', immagine: 'assets/esempio.jpg'},
    {nome:'Museo Egizio - Torino', immagine: 'assets/prova.avif'},
    {nome:'Galleria dell\'Accademia - Firenze',immagine: 'assets/prova.avif'},
    {nome:'Museo Nazionale di Castel Sant\'Angelo - Roma', immagine: 'assets/prova.avif'},
    {nome:'Museo Nazionale Archeologico - Napoli', immagine: 'assets/prova.avif'},
    {nome:'Palazzo Pitti - Firenze', immagine: 'assets/prova.avif'},
    {nome:'MAXXI - Museo Nazionale delle Arti del XXI Secolo - Roma',immagine: 'assets/prova.avif'},
    {nome: 'Museo dell\'Opera del Duomo - Firenze', immagine: 'assets/prova.avif'},
    {nome:'Museo Nazionale Romano - Roma', immagine: 'assets/prova.avif'},
    {nome:'Museo Civico di Castelbuono - Castelbuono', immagine: 'assets/prova.avif'},
    {nome:'Museo Galileo - Firenze', immagine: 'assets/prova.avif'},
    {nome:'Triennale Design Museum - Milano',immagine: 'assets/prova.avif'},
    {nome:'Museo del Novecento - Milano',immagine: 'assets/prova.avif'},
    {nome:'Museo di Capodimonte - Napoli', immagine: 'assets/prova.avif'},
    {nome:'Peggy Guggenheim Collection - Venezia',immagine: 'assets/prova.avif'},
    {nome:'Gallerie dell\'Accademia - Venezia',immagine: 'assets/prova.avif'},
    {nome:'Museo Archeologico Nazionale - Taranto', immagine: 'assets/prova.avif'},
    {nome:'Museo Storico Italiano della Guerra - Rovereto',immagine: 'assets/prova.avif'},
    {nome:'Museo Ferrari - Maranello',immagine: 'assets/prova.avif'}
  ];
}