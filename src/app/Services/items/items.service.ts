import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  constructor(private httpclient: HttpClient) { }

  // Fetch products with pagination and simulated delay
  getAS(offset: number, limit: number): Observable<any> {
    return this.httpclient
      .get(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`)
      .pipe(delay(500)); // Delay to show loading spinner
  }
}