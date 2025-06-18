export interface Struttura {
  idStruttura: number;
  nomeStruttura: string;
  descrizione: string;
  indirizzoCompleto: string;
  citta: string;
  provincia: string;
  via: string;
  ambito: string;
  social1:string;
  social2:string;
  posizione:string;
  sitoWeb:string;
  testoSemplificato:string;
  flgDisabilita:boolean;
  immagine:{
    nomeImmagine:string;
    byteImmagine:number;
    didascaliaImmagine:string;
  };
  immagineUrl?:string;
  disabilita:[
    {categoria:string, descrizione:string}
  ];
}