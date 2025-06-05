import { DisabilitaStruttura } from "./IDisabilitàStruttura";

export interface Struttura{
   id: number;
  nome: string;
  descrizione: string;
  posizione: {
    indirizzo: string;
    citta: string;
    provincia: string;
    via: string;
  };
  ambito: string;
  dataInserimeto: Date;
  flgDisabilita: boolean;
  disabilita: DisabilitaStruttura[];
}