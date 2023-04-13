export interface ICliente {
  cpf: number,
  nome:string,
  rendaMensal:number,
  logradouro:string,
  cep:string,
  numero:number,
  quantidadeEmprestimo?:number,
  cidade:string,
  uf:string,
  bairro:string
}
