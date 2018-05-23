import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  private apiPath = 'http://localhost:8080/api';

  constructor() { }


  getApiPath(): string {
    return this.apiPath;
  }

}
