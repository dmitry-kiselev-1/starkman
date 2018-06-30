import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
export abstract class BaseService {

  protected apiDomain: string = "https://localhost:4000/api/";
  protected apiPoint: string;

  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': '83ce7cb9-a84d-4560-946b-13602bf13ec1'
    })
  };

  constructor() {}
}
