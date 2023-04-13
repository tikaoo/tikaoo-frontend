import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.dev';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICliente } from '../model/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteHttpService {

  constructor(private http: HttpClient) { }

  private readonly api = environment.api

  getClientes(): Observable<ICliente[]> {
    return this.http.get<ICliente[]>(`${this.api}`)
  }

  getClienteCpf(cpf: number): Observable<ICliente> {
    return this.http.get<ICliente>(`${this.api}/${cpf}`)
  }

  deleteCliente(cpf: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${cpf}`)
  }

  createCliente(cliente: ICliente): Observable<ICliente> {
    return this.http.post<ICliente>(`${this.api}`, cliente)
  }
  updateCliente(cliente: ICliente): Observable<ICliente> {
    return this.http.put<ICliente>(`${this.api}/${cliente.cpf}`, cliente)
  }

  getCep(cep:string){
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`);
  }


}
