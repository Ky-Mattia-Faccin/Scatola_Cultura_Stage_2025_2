import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TbStruttura } from '../../strutture/TbStruttura';
import { TbDisabilitaStruttura } from '../../strutture/tbDisabilitàStruttura'
import { TbDisabilitaCategorie } from '../../strutture/tbDisabilitaCategorie';
@Component({
  standalone:true,
  selector: 'app-homepage',
  imports: [RouterModule,CommonModule],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css'
})
export class Homepage {
  items = [{nome: 'Musei Vaticani - Città del Vaticano', immagine: 'assets/prova.avif'},
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
    {nome:'Museo Ferrari - Maranello',immagine: 'assets/prova.avif'}];
  strutture: TbStruttura[] = [
  {
    idStruttura: 1,
    nomeStruttura: "Museo d'Arte Moderna",
    descrizione: "Collezione di arte moderna e contemporanea",
    indirizzoCompleto: "Via della Cultura 10, Roma",
    citta: "Roma",
    provincia: "RM",
    via: "Via della Cultura 10",
    ambito: "Museo d'Arte",
    dataInserimento: new Date("2023-03-15"),
    flgDisabilita: true
  },
  {
    idStruttura: 2,
    nomeStruttura: "Parco Naturale della Maremma",
    descrizione: "Area protetta per escursioni naturalistiche",
    indirizzoCompleto: "Strada Provinciale 3, Grosseto",
    citta: "Grosseto",
    provincia: "GR",
    via: "Strada Provinciale 3",
    ambito: "Struttura Naturale",
    dataInserimento: new Date("2023-06-22"),
    flgDisabilita: false
  },
  {
    idStruttura: 3,
    nomeStruttura: "Castello Medievale",
    descrizione: "Castello visitabile con tour guidato",
    indirizzoCompleto: "Via Castello 5, Firenze",
    citta: "Firenze",
    provincia: "FI",
    via: "Via Castello 5",
    ambito: "Visita Guidata",
    dataInserimento: new Date("2024-01-10"),
    flgDisabilita: true
  },
  {
    idStruttura: 4,
    nomeStruttura: "Galleria Fotografica Nazionale",
    descrizione: "Mostre temporanee e collezioni permanenti di fotografia",
    indirizzoCompleto: "Via degli Scatti 21, Milano",
    citta: "Milano",
    provincia: "MI",
    via: "Via degli Scatti 21",
    ambito: "Museo Fotografico",
    dataInserimento: new Date("2024-11-05"),
    flgDisabilita: false
  },
  {
    idStruttura: 5,
    nomeStruttura: "Acquario Marino di Genova",
    descrizione: "Esplorazione del mondo marino con tunnel subacquei",
    indirizzoCompleto: "Ponte Spinola, Genova",
    citta: "Genova",
    provincia: "GE",
    via: "Ponte Spinola",
    ambito: "Acquario / Struttura Marina",
    dataInserimento: new Date("2024-08-17"),
    flgDisabilita: true
  },
  {
    idStruttura: 6,
    nomeStruttura: "Osservatorio Astronomico",
    descrizione: "Esperienze notturne con telescopi e planetario",
    indirizzoCompleto: "Via delle Stelle 9, Padova",
    citta: "Padova",
    provincia: "PD",
    via: "Via delle Stelle 9",
    ambito: "Scienza / Planetario",
    dataInserimento: new Date("2024-12-02"),
    flgDisabilita: false
  }
];
disabilitaStrutture: TbDisabilitaStruttura[] = [
  {
    disabilitaStruttura: 1,
    categoriaDisabilita: "Mobilità ridotta",
    idStruttura: 1,
    descrizione: "Accesso con rampe e ascensore disponibile.",
    dataInserimento: new Date("2023-03-15"),
    flgDisabilita: true
  },
  {
    disabilitaStruttura: 2,
    categoriaDisabilita: "Uditiva",
    idStruttura: 3,
    descrizione: "Disponibilità di guide in lingua LIS.",
    dataInserimento: new Date("2024-01-10"),
    flgDisabilita: true
  },
  {
    disabilitaStruttura: 3,
    categoriaDisabilita: "Visiva",
    idStruttura: 5,
    descrizione: "Percorsi tattili e pannelli in braille.",
    dataInserimento: new Date("2024-08-17"),
    flgDisabilita: true
  },
  {
    disabilitaStruttura: 4,
    categoriaDisabilita: "Cognitiva",
    idStruttura: 2,
    descrizione: "Supporti visivi e personale formato disponibile.",
    dataInserimento: new Date("2023-06-22"),
    flgDisabilita: false
  },
  {
    disabilitaStruttura: 5,
    categoriaDisabilita: "Mobilità ridotta",
    idStruttura: 6,
    descrizione: "Osservatorio accessibile tramite ascensore e passerelle.",
    dataInserimento: new Date("2024-12-02"),
    flgDisabilita: false
  },
  {
    disabilitaStruttura: 6,
    categoriaDisabilita: "Uditiva",
    idStruttura: 4,
    descrizione: "App per audioguida compatibile con impianti cocleari.",
    dataInserimento: new Date("2024-11-05"),
    flgDisabilita: true
  }
];
}