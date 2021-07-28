import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators'
import { Clientes } from './nomes/clientes';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  contatosUrl = "/api/clientes";

  constructor(private http: HttpClient) {}

  getAll(): Observable<any>{
    return this.http.get<any[]>(`${this.contatosUrl}`)
  }
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  saveClientes(clientes: any): Observable<any> {
    return this.http.post<any>(this.contatosUrl, JSON.stringify(clientes), this.httpOptions)
      .pipe(
        retry(2),
      )
  }

  updateClientes(clientes: any): Observable<any> {
    return this.http.put<any>(this.contatosUrl + '/' + clientes.id, JSON.stringify(clientes), this.httpOptions)
      .pipe(
        retry(1),
      )
  }

  deleteClientes(clientes: any) {
    return this.http.delete<any>(this.contatosUrl + '/' + clientes.id, this.httpOptions)
      .pipe(
        retry(1),
      )
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `mensagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

  }

 