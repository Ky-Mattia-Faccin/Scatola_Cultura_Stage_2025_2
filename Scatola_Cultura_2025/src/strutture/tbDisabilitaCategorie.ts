export interface TbDisabilitaCategorie {
  categoriaDisabilita: string;   // Chiave primaria testuale univoca (es: "Visiva")
  descCategoria: string;         // Descrizione della disabilità
  dataInserimento: Date;         // Data di inserimento (formato Date ISO)
  flgDisabilita: boolean;        // Flag disabilità (default false)
}
