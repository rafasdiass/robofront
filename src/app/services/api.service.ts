// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:8080/api'; // URL base do seu backend

  constructor(private http: HttpClient) {}

  getRoboDecisions(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/robo-decisions`);
  }

  // Método adicionado para buscar dados de ações
  getStockData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/stock-data`); // Substitua 'stock-data' pelo endpoint correto
  }
}
