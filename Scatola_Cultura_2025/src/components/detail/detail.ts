import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Struttura } from '../../interfaces/Istruttura';
import { DisabilitaStruttura } from '../../interfaces/IDisabilitàStruttura';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IconeManager } from './IconeManager';
import { DetailTestoComponent } from './detail-testo/detail-testo.component';



@Component({
  standalone: true,
  selector: 'app-detail',
  imports: [RouterModule, RouterLink, CommonModule, DetailTestoComponent],
  templateUrl: './detail.html',
  styleUrls: ['./detail.css'],
})

export class Detail implements OnInit {
  @Input() struttura!: Struttura;

  ngOnInit(): void {
    this.struttura = MOCK_STRUTTURA;
  }

  constructor(private sanitizer: DomSanitizer, private iconeManager:IconeManager) {}

  Icone=this.iconeManager
  

  toggleZoom(container:HTMLElement){
    container.classList.toggle('sc-zoomed');
  }


  
  getAccessibilityText(): string {
    const acc = document.querySelector('.sc-detail-footer-accessibility');
    const testo = acc?.textContent?.toString();

    return testo!;
  }
}

const MOCK_DISABILITA: DisabilitaStruttura[] = [
  {
    idStruttura: 1,
    disabilitaStruttura: 1,
    categoria: 'Mobilità',
    descrizione: 'Accesso facilitato per sedie a rotelle',
    dataInserimento: new Date('2023-01-15'),
    flgDisabilita: true,
  },
  {
    idStruttura: 1,
    disabilitaStruttura: 1,
    categoria: 'Mobilità',
    descrizione: 'Accesso facilitato per sedie a rotelle',
    dataInserimento: new Date('2023-01-15'),
    flgDisabilita: true,
  },
  {
    idStruttura: 1,
    disabilitaStruttura: 1,
    categoria: 'Mobilità',
    descrizione: 'Accesso facilitato per sedie a rotelle',
    dataInserimento: new Date('2023-01-15'),
    flgDisabilita: true,
  },
  {
    idStruttura: 1,
    disabilitaStruttura: 1,
    categoria: 'Mobilità',
    descrizione: 'Accesso facilitato per sedie a rotelle',
    dataInserimento: new Date('2023-01-15'),
    flgDisabilita: true,
  },
  {
    idStruttura: 1,
    disabilitaStruttura: 1,
    categoria: 'Mobilità',
    descrizione: 'Accesso facilitato per sedie a rotelle',
    dataInserimento: new Date('2023-01-15'),
    flgDisabilita: true,
  },
  {
    idStruttura: 1,
    disabilitaStruttura: 1,
    categoria: 'Mobilità',
    descrizione: 'Accesso facilitato per sedie a rotelle',
    dataInserimento: new Date('2023-01-15'),
    flgDisabilita: true,
  },
  {
    idStruttura: 2,
    disabilitaStruttura: 2,
    categoria: 'Udito',
    descrizione: 'Servizio di interpretariato LIS disponibile',
    dataInserimento: new Date('2023-03-22'),
    flgDisabilita: false,
  },
  {
    idStruttura: 3,
    disabilitaStruttura: 3,
    categoria: 'Vista',
    descrizione: 'Materiali in braille e audioguide',
    dataInserimento: new Date('2023-05-10'),
    flgDisabilita: true,
  },
  {
    idStruttura: 3,
    disabilitaStruttura: 3,
    categoria: 'Vista',
    descrizione: 'Materiali in braille e audioguide',
    dataInserimento: new Date('2023-05-10'),
    flgDisabilita: true,
  },
  {
    idStruttura: 3,
    disabilitaStruttura: 3,
    categoria: 'Vista',
    descrizione: 'Materiali in braille e audioguide',
    dataInserimento: new Date('2023-05-10'),
    flgDisabilita: true,
  },
  {
    idStruttura: 3,
    disabilitaStruttura: 3,
    categoria: 'Vista',
    descrizione: 'Materiali in braille e audioguide',
    dataInserimento: new Date('2023-05-10'),
    flgDisabilita: true,
  },
  {
    idStruttura: 3,
    disabilitaStruttura: 3,
    categoria: 'Vista',
    descrizione: 'Materiali in braille e audioguide',
    dataInserimento: new Date('2023-05-10'),
    flgDisabilita: true,
  },
  {
    idStruttura: 3,
    disabilitaStruttura: 3,
    categoria: 'Vista',
    descrizione: 'Materiali in braille e audioguide',
    dataInserimento: new Date('2023-05-10'),
    flgDisabilita: true,
  },
  {
    idStruttura: 3,
    disabilitaStruttura: 3,
    categoria: 'Vista',
    descrizione: 'Materiali in braille e audioguide',
    dataInserimento: new Date('2023-05-10'),
    flgDisabilita: true,
  },
  {
    idStruttura: 3,
    disabilitaStruttura: 3,
    categoria: 'Vista',
    descrizione: 'Materiali in braille e audioguide',
    dataInserimento: new Date('2023-05-10'),
    flgDisabilita: true,
  },
  {
    idStruttura: 3,
    disabilitaStruttura: 3,
    categoria: 'Vista',
    descrizione: 'Materiali in braille e audioguide',
    dataInserimento: new Date('2023-05-10'),
    flgDisabilita: true,
  },
  {
    idStruttura: 3,
    disabilitaStruttura: 3,
    categoria: 'Vista',
    descrizione: 'Materiali in braille e audioguide',
    dataInserimento: new Date('2023-05-10'),
    flgDisabilita: true,
  },
  {
    idStruttura: 3,
    disabilitaStruttura: 3,
    categoria: 'Vista',
    descrizione: 'Materiali in braille e audioguide',
    dataInserimento: new Date('2023-05-10'),
    flgDisabilita: true,
  },
  {
    idStruttura: 3,
    disabilitaStruttura: 3,
    categoria: 'Vista',
    descrizione: 'Materiali in braille e audioguide',
    dataInserimento: new Date('2023-05-10'),
    flgDisabilita: true,
  },
];

const MOCK_STRUTTURA: Struttura = {
  id: 101,
  nome: 'Museo della Cultura Locale',
  descrizione: 'Un museo dedicato alla storia e tradizioni locali',
  posizione: {
    indirizzo: 'Via Roma 25',
    citta: 'Torino',
    provincia: 'TO',
    via: 'Via Roma',
  },
  ambito: 'Culturale',
  dataInserimeto: new Date('2022-12-01'),
  flgDisabilita: false,
  disabilita: MOCK_DISABILITA,
};
