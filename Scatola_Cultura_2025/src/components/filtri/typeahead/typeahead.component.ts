import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { TextimgTsService } from '../../../services/textimg.service';

@Component({
  selector: 'app-typeahead',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './typeahead.component.html',
  styleUrl: './typeahead.component.css',
})
export class TypeaheadComponent implements OnInit, OnDestroy {

  constructor(private textService : TextimgTsService){}
  //michael

  //Riferimento al container `.select` nel template
  @ViewChild('selectContainer') selectContainer?: ElementRef<HTMLElement>;

  // Nome filtro da mostrare o usare come riferimento
  @Input() nomeFiltro!: string;

  // Observable che fornisce l'array di stringhe da filtrare e mostrare
  @Input() Array$!: Observable<string[]>;

  // Evento che emette il nome filtro selezionato (una volta al caricamento)
  @Output() evento = new EventEmitter<string>();

  // Evento che emette l'array di elementi selezionati con checkbox
  @Output() ArrayChecked = new EventEmitter<string[]>();

  // Array locale degli elementi selezionati (checkbox)
  ArrayCheckedLocal: string[] = [];

  // Filtro testo inserito per ricerca
  filtro!: string | null;

  // Array completo delle opzioni ricevute
  OptionsArray: string[] = [];

  // Array filtrato in base al filtro testo
  filteredOptionsArray: string[] = [];

  // Flag per evitare emissioni multiple dell'evento "evento"
  loaded: boolean = false;

  //flag per controllare l'apertura del menu
  menuAperto: boolean = false;

  // Subscription per l'Observable Array$
  private subscription?: Subscription;

  /*
   * OnInit:
   * - Sottoscrive all'Observable Array$ per ricevere dati
   * - Inizializza la lista opzioni filtrate
   */
  ngOnInit(): void {
    this.subscribeToArray$();
  }

  /*
   * OnChanges:
   * - Se cambia l'Observable Array$, aggiorna la sottoscrizione
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['Array$'] && this.Array$) {
      this.subscribeToArray$();
    }
  }

  /*
   * OnDestroy:
   * - Disiscrive la subscription per evitare memory leak
   */
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  /*
   * Gestisce la sottoscrizione all'Observable Array$
   * - Aggiorna OptionsArray con i nuovi dati
   * - Aggiorna filteredOptionsArray filtrando in base a filtro
   */
  private subscribeToArray$() {
    this.subscription?.unsubscribe(); // evita duplicati
    this.subscription = this.Array$?.subscribe((value) => {
      this.OptionsArray = value;
      this.filterArray();

      // Ora che le opzioni ci sono, prova a settare la selezione da sessionStorage
      const saved = sessionStorage.getItem(
        `filtro-${this.nomeFiltro.toLowerCase()}-selected`
      );
      if (saved) {
        const selezionati = JSON.parse(saved);
        this.setSelected(selezionati);
      }
    });
  }

  /*
   * Filtra OptionsArray in base al filtro testuale
   * - Se filtro è vuoto, mostra tutte le opzioni
   */
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

  /*
   * Invia evento con nomeFiltro (una sola volta)
   */
  InviaEvento(nomeFiltro: string) {
    if (!this.loaded) {
      this.evento.emit(nomeFiltro);
      this.loaded = true;
    }
  }

  /*
   * Imposta il filtro testo al valore cliccato
   */
  setFiltro(event: Event) {
    const target = event.target as HTMLElement;
    this.filtro = target.textContent;
  }

  /*
   * Gestore per il cambio del filtro (input text)
   * - Aggiorna la lista filtrata
   */
  onFiltroChange() {
    this.filterArray();
  }

  /*
   * Gestore per il cambio checkbox
   * - Aggiunge o rimuove il valore dall'array locale
   * - Emette l'array aggiornato tramite ArrayChecked
   */
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

    //// Salva selezioni su sessionStorage con chiave personalizzata
    const key = `filtro-${this.nomeFiltro.toLowerCase()}-selected`;
    sessionStorage.setItem(key, JSON.stringify(this.ArrayCheckedLocal));
  }

  //metodo per resettare le selezioni fatte
  reset() {
    this.ArrayCheckedLocal = [];
    this.filtro = null;
    this.filteredOptionsArray = this.OptionsArray;
    this.ArrayChecked.emit(this.ArrayCheckedLocal);

    // Rimuovi dal sessionStorage i valori selezionati per questo filtro
    const key = `filtro-${this.nomeFiltro.toLowerCase()}-selected`;
    sessionStorage.removeItem(key);
  }

  //metodi per gestire l'apertura dei menù
  openMenu() {
    this.menuAperto = true;
  }

  //Chiude il menu solo se il focus esce completamente dal componente
  onfocusOut(event: FocusEvent) {
    const related = event.relatedTarget as HTMLElement;
    if (!this.selectContainer?.nativeElement.contains(related)) {
      this.menuAperto = false;
    }
  }
  //metodo per impostare le checkbox
  setSelected(selezionati: string[]) {
    this.ArrayCheckedLocal = [...selezionati];
    this.ArrayChecked.emit(this.ArrayCheckedLocal);
  }
}
