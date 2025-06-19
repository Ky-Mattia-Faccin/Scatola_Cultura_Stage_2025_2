
import {
  Component,
  EventEmitter,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { SearchFilterService } from '../../services/search-filter.service';
import {
  NavigationEnd,
  Router,
  RouterLink,
  Event as RouterEvent,
} from '@angular/router';
import { TextimgTsService } from '../../services/textimg.service';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
  constructor(
    public searchService: SearchFilterService,
    private textService: TextimgTsService,
    private router: Router,
    private http: HttpClient
  ) {}


  //========michael=========0

  // Valore della luminosità impostato tramite slider
  brightness: number = 100;

  // Valore del contrasto impostato tramite slider
  contrast: number = 100;

  //Valore attuale del textsize : Simone


  fontSize : number=20;




  // Output: emette il nuovo valore di luminosità verso il componente genitore

  @Output() brightnessChanged = new EventEmitter<number>();

  // Output: emette il nuovo valore di contrasto per il componente genitore
  @Output() contrastChanged = new EventEmitter<number>();

  // Iniezione del servizio SearchFilterService per aggiornare il filtro di ricerca

  // Testo inserito dall'utente nel campo input della barra di ricerca
  FiltroInput!: string;

  // Variabile di bind in template, controlla visibilità della search bar
  showSearch: Boolean = true;

  /*
   * - Gestisce l’evento di input della barra di ricerca
   * - Recupera il valore digitato
   * - Invia il filtro aggiornato al servizio condiviso
   */
  onInputChange(evento: Event) {
    const target = evento.target as HTMLInputElement;

    this.searchService.setSearchFilter(target.value);
  }

  /*
   * - Mostra o nasconde il menu a discesa (dropdown)
   * - Agisce sull'elemento con classe ‘sc-navbar-dropdown-menu’
   * - Aggiunge/rimuove la classe 'hidden' per gestire la visibilità
   */
  toggleMenu() {
    const dropDownMenu = document.querySelector('.sc-navbar-dropdown-menu');
    dropDownMenu?.classList.toggle('hidden');
  }

  //nasconde o mostra la barra di ricerca in base alla rotta attiva
  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(
          (event: RouterEvent): event is NavigationEnd =>
            event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects;
        this.showSearch = !url.startsWith('/detail/');
      });
  }

  //=====SIMONE======//

  //valore attuale della descrizione per la didascalia delle immagini
  isDescriptionActive: boolean = false;
  
  onCheck() {
    this.isDescriptionActive = !this.isDescriptionActive;
    this.textService.triggerChange(this.isDescriptionActive);
  }

  /**
   * Simone
   * evento lanciato al cambiamento del checkbox, cambia il font da normale a OpenDyslexic, da dropdown Accessibilità
   * se false lascia quello normale
   * se true imposta il font OpenDyslexic ovunque tramite "styles.css" dalla variabile --fontName
   * variabili utilizzate:
   *  - isFontActive: boolean = impostato a false, controlla quando il checkbox va a cambiare il valore
   *  - --fontName:va a impostare su styles.css il font scelto
   */

  isFontActive: boolean = false;
  onFontCheck() {
    this.isFontActive = !this.isFontActive;
    if (this.isFontActive === true)
      document.documentElement.style.setProperty('--fontName', 'OpenDyslexic');
    else document.documentElement.style.setProperty('--fontName', 'Verdana');
  }

  /**
   * Simone
   * Evento lanciato al cambiamento del checkbox, cambia il il testo normale a un test più corto e semplice, da dropdown Accessibilità
   * se false lascia il testo normale
   * altrimenti se true imposta il testo semplificato
   * variabili utilizzate :
   *  -isTextSemplifiedActive : boolean = impostato a false, controlla quando il checkbox va a cambiare il valore
   */
  isTextSemplifiedActive: boolean = false;
  onTextSimplifiedCheck() {
    this.isTextSemplifiedActive = !this.isTextSemplifiedActive;
    this.textService.textSemplifiedChange(this.isTextSemplifiedActive);
  }

  /***
   * Simone
   * Evento lanciato al cambiamento della dimensione del testo, da dropdown Accessibilità.
   * Ottiene il valore e lo imposta sulla variabile CSS: "--font-size"
   */
  textSizeChange(event: Event): void {
    document.documentElement.style.setProperty(
      '--fontSize',
      this.fontSize.toString() + 'px'
    );
  }

  /**
   * Simone
   * quando viene premuto il pulsante Manuale CAA passa per qui per prende il file;
   * crea il file nella nuova scheda aprendolo;
   * e gli mette come nome nella tab in alto il nome Manuale CAA
   */
   openManual() {
    this.http.get('assets/CAA.pdf', { responseType: 'blob' }).subscribe(blob => {
      const fileURL = URL.createObjectURL(blob);

      const newWindow = window.open();
      if (newWindow) {
        const html = `
          <html>
            <head><title>Manuale CAA</title></head>
            <body style="margin:0">
              <iframe src="${fileURL}" frameborder="0" style="width:100vw;height:100vh;"></iframe>
            </body>
          </html>
        `;
        newWindow.document.write(html);
        newWindow.document.close();
      }
    });
  }

/**
 * Simone
 * quando vengono cliccati i pulsanti sopra allo slider in base a quale viene premuto chiamata questo metodo con il nome della proprietà e con il valore da aggiungere, min e max
 * aumenta il valore o diminuisce in base a quale proprietà viene passata
 * se brightness : aumenta di 10 o diminuisce di 10 la luminosità della pagina
 * se contrast : aumenta di 10 o diminuisce di 10 il contrasto
 * se textSize: aumenta di 2 o diminuisce di 2 la grandezza dei testi
 * Passa il valore cambiato all'output emitter se brightness o contrast altrimenti al --fontSize sullo styles.css generale
 */
  changeValue(
    property: 'brightness'| 'contrast' | 'fontSize',
    valueToAdd : number,
    min : number,
    max : number,
    onChange?: (value: number) => void
  ){
    this[property]=Math.min(max, Math.max(min, this[property] +valueToAdd));

    if(onChange){
      onChange(this[property])
    }

    switch (property) {
    case 'brightness':
      this.brightnessChanged.emit(this.brightness);
      break;
    case 'contrast':
      this.contrastChanged.emit(this.contrast);
      break;
    case 'fontSize':
      document.documentElement.style.setProperty(
        '--fontSize',
        this.fontSize + 'px'
      );
      break;
   }
  }

}
