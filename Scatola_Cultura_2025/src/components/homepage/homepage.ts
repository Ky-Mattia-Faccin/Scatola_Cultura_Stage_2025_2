import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TbStruttura } from '../../strutture/TbStruttura';
import { TbDisabilitaStruttura } from '../../strutture/tbDisabilitàStruttura'
import { TbDisabilitaCategorie } from '../../strutture/tbDisabilitaCategorie';
import { Struttura } from '../../interfaces/Istruttura';

@Component({
  standalone:true,
  selector: 'app-homepage',
  imports: [RouterModule,CommonModule],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css'
})

export class Homepage {

  strutture:Struttura[]=[];

  

  ngOnInit(): void {
    this.strutture = JSON.parse(localStorage.getItem('strutture') || '[]');
  }


  
}