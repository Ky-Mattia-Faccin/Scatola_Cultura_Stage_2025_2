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
  disabilita:Disabilita[];
  immagine?: ImmagineDTO;
}


export interface catDisabilita {
  nome: string;
  descrizione: string;
  flgDisabilita: boolean;
}


export interface Disabilita{
  idStruttura:number,
  categoria:catDisabilita;
  descrizione:string,
  testoSemplice:string,
  flgDisabilita:boolean;
  disabilitaStruttura:number;
  flgWarning:boolean;
}

export interface ImmagineDTO {
  idImmagine: number;
  idStruttura: number;
  nomeImmagine: string;
  immagineUrl: string | null;
  didascaliaImmagine: string | null;
}