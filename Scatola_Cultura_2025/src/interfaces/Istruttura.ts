export interface Struttura {
  idStruttura: number;
  nomeStruttura: string;
  descrizione: string;
  indirizzoCompleto: string;
  citta: string;
  provincia: string;
  via: string;
  ambito: string;
  disabilita:[
    {categoria:string, descrizione:string}
  ];
  DidascaliaImmagine:string;
  TestoSemplificato:string;
}
