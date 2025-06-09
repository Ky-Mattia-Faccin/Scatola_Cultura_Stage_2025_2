import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Homepage } from '../homepage/homepage';
import { Detail } from '../detail/detail';
import { RouterLink } from '@angular/router';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { Struttura } from '../../interfaces/Istruttura';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable,map,tap } from 'rxjs';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Detail, RouterLink, NavBarComponent,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  
  title = 'Scatola_Cultura_2025';
  
  brightness:number=100
  contrast:number=100
  
  strutture:Struttura[]=[];

  constructor(private httpClient:HttpClient ){}

  //all avvio richiede i dati in formato json li converte e li salva nello storage del browser
  ngOnInit(): void {
    this.getStrutture().subscribe(dati=>{
      this.strutture=dati;
      const strutturaJson=JSON.stringify(this.strutture)
      if(strutturaJson!=null)
        localStorage.setItem('strutture',strutturaJson);

    });
    
  }

  getStrutture():Observable<Struttura[]>{
    return this.httpClient.get<Struttura[]>('./assets/struttura.json');
  }


  //applica i filtri di luminosità e contrasto
  applyFilter(){
    const pagina= document.querySelector('.sc-pagina') as HTMLElement

    if(pagina){
      pagina.style.filter = `brightness(${this.brightness}%) contrast(${this.contrast}%)`;
    }

   
  }


}
