export interface TbStruttura {
  idStruttura: number;          // Chiave primaria auto-incrementante
  nomeStruttura: string;        // Nome
  descrizione?: string | null;  // Breve descrizione
  indirizzoCompleto: string;    // Indirizzo (testuale)
  citta?: string | null;        // Città di appartenenza (per filtri)
  provincia?: string | null;    // Acronimo provincia (per filtri)
  via?: string | null;          // Via
  ambito?: string | null;       // Ambito (museo, visita guidata, ecc.)
  dataInserimento: Date;      // Data di inserimento (ISO string: "YYYY-MM-DD")
  flgDisabilita: boolean;       // Flag disabilità (default false)
}
