import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Supondo que o URL seja algo como 'http://localhost:8000/api/robo-decisions'
  private roboDecisionsUrl = 'http://localhost:8000/api/robo-decisions'; 

  constructor(private http: HttpClient) {}

  getRoboDecisions(): Observable<any[]> {
    return this.http.get<any[]>(this.roboDecisionsUrl);
  }

  // outros métodos...
}
