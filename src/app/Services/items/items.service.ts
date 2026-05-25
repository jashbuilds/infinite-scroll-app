import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  constructor(private httpclient: HttpClient) {}

  getAS(page: number, limit: number): Observable<any> {
    return this.httpclient
      .get(`https://api.escuelajs.co/api/v1/products?offset=0&limit=${limit}&page=${page}`)
      .pipe(delay(0));
  }
}