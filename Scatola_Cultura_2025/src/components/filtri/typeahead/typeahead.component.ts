import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  Observable } from 'rxjs';
import { __values } from 'tslib';




@Component({
  selector: 'app-typeahead',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './typeahead.component.html',
  styleUrl: './typeahead.component.css'
})
export class TypeaheadComponent implements OnInit{
  
	@Input() Array$!:Observable<string[]>;
  @Output() evento= new EventEmitter<string>;


filtro!:string |null
Array!:string[]


  ngOnInit(): void {
      this.Array$.subscribe(value=>{
        this.Array=value
      })
  }
  

  InviaEvento(){
    console.log(this.evento.emit())
    this.evento.emit();
  }

	setFiltro(event:Event){
		const target=event.target as HTMLInputElement
		this.filtro=target.textContent;
	}


}
