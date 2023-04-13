export interface IEmprestimo {
  idEmprestimo?:number,
  dataFinal:Date,
   dataInicial:Date,
   valorfinal: number,
   valorInicial:number,
   relacionamento:string,
   cpfCliente?:number
}
