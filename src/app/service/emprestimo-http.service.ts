import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { IEmprestimo } from '../model/Emprestimo';

@Injectable({
  providedIn: 'root'
})
export class EmprestimoHttpService {

  constructor(private http: HttpClient) {}

  private readonly api = environment.api;
  endpoint = 'emprestimos';

  getEmprestimos(): Observable<IEmprestimo[]> {
    return this.http.get<IEmprestimo[]>(`${this.api}/${this.endpoint}`)}

  getEmprestimoCliente(cpf: number): Observable<IEmprestimo> {
    return this.http.get<IEmprestimo>(`${this.api}/${cpf}/${this.endpoint}`);
  }
  createEmprestimo(emprestimo: IEmprestimo,cpf: number):Observable<IEmprestimo> {
    return this.http.post<IEmprestimo>(
      `${this.api}/${cpf}/${this.endpoint}`,
      emprestimo
    );
  }
  deleteEmprestimo(cpf: number, id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${cpf}/${this.endpoint}/${id}`);
  }


}
