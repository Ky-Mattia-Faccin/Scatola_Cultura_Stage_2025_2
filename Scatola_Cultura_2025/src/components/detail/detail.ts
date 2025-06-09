import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { Struttura } from '../../interfaces/Istruttura';
import { DisabilitaStruttura } from '../../interfaces/IDisabilitàStruttura';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IconeManager } from './IconeManager';
import { DetailTestoComponent } from './detail-testo/detail-testo.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';



@Component({
  standalone: true,
  selector: 'app-detail',
  imports: [RouterModule, RouterLink, CommonModule, DetailTestoComponent,HttpClientModule],
  templateUrl: './detail.html',
  styleUrls: ['./detail.css'],
})

export class Detail implements OnInit {

  constructor(private sanitizer: DomSanitizer, private iconeManager:IconeManager,
              private route:ActivatedRoute,private httpsClient:HttpClient) {}


  idStruttura!:number;
  struttura!:Struttura;
  disabilitaStruttura!:DisabilitaStruttura[];
  
  ngOnInit(): void {
    const parametroId=this.route.snapshot.paramMap.get('id');
    if(parametroId!=null){
      this.idStruttura=parseInt(parametroId,10)

      //caricamento strutture da localstorage
      const strutture:Struttura[]=JSON.parse(localStorage.getItem('strutture')||'[]');
      const trovata=strutture.find((s:Struttura)=>s.id===this.idStruttura)

      if(trovata)
        this.struttura=trovata
      else{
        console.error(`struttura con id: ${this.idStruttura} non trovata`);
      }
      //richiesta dei dati sulle disabilita della struttura con quell id
      this.getDisabilita().subscribe(dato=>{
        this.disabilitaStruttura=dato;
      })
      //da salvere in locale??



    }else{
      console.error(`la struttura con id: ${this.idStruttura} non esiste`);
    }
  }

  getDisabilita():Observable<DisabilitaStruttura[]>{
    return this.httpsClient.get<DisabilitaStruttura[]>('./assets/disabilita_struttura.json')
  }

  Icone=this.iconeManager
  

  toggleZoom(container:HTMLElement){
    let element=container.closest('.sc-detail-center-desc')?.classList.toggle('sc-zoomed');
    if(!element)
      element=container.closest('.sc-detail-footer-accessibility')?.classList.toggle('sc-zoomed');
    document.querySelector('pagina')
  }



}
