export interface TbDisabilitaStruttura {
  disabilitaStruttura: number;        // Chiave primaria auto-incrementante univoca
  categoriaDisabilita: string;        // Chiave esterna verso TbDisabilitaCategorie
  idStruttura: number;                // Chiave esterna verso TbStruttura
  descrizione: string;                // Descrizione della disabilità
  dataInserimento: Date;            // Data di inserimento (formato ISO: "YYYY-MM-DD")
  flgDisabilita: boolean;             // Flag disabilità (default false)
}
