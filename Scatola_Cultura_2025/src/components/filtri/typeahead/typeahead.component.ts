import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-typeahead',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './typeahead.component.html',
  styleUrl: './typeahead.component.css',
})
export class TypeaheadComponent implements OnInit, OnDestroy {
  //michael

  @Input() nomeFiltro!: string;
  @Input() Array$!: Observable<string[]>;
  @Output() evento = new EventEmitter<string>();
  @Output() ArrayChecked = new EventEmitter<string[]>();

  ArrayCheckedLocal: string[] = [];

  filtro!: string | null;
  OptionsArray: string[] = [];
  filteredOptionsArray: string[] = [];

  loaded: boolean = false;

  private subscription?: Subscription;

  ngOnInit(): void {
    this.subscribeToArray$();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['Array$'] && this.Array$) {
      this.subscribeToArray$();
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private subscribeToArray$() {
    this.subscription?.unsubscribe(); // evita duplicati
    this.subscription = this.Array$?.subscribe((value) => {
      this.OptionsArray = value;
      this.filterArray();
    });
  }

  private filterArray() {
    if (!this.filtro) {
      this.filteredOptionsArray = this.OptionsArray;
    } else {
      const filtroLower = this.filtro.toLowerCase();
      this.filteredOptionsArray = this.OptionsArray.filter((el) =>
        el.toLowerCase().includes(filtroLower)
      );
    }
  }

  InviaEvento(nomeFiltro: string) {
    if (!this.loaded) {
      this.evento.emit(nomeFiltro);
      this.loaded = true;
    }
  }

  setFiltro(event: Event) {
    const target = event.target as HTMLElement;
    this.filtro = target.textContent;
  }

  onFiltroChange() {
    this.filterArray();
  }

  onCheckboxChanges(event: Event, valore: string) {
    const checked = (event.target as HTMLInputElement).checked;

    if (checked) {
      if (!this.ArrayCheckedLocal.includes(valore))
        this.ArrayCheckedLocal.push(valore);
    } else {
      //rimuove se non è checkato
      this.ArrayCheckedLocal = this.ArrayCheckedLocal.filter(
        (v) => v !== valore
      );
    }
    this.ArrayChecked.emit(this.ArrayCheckedLocal);
  }
}
