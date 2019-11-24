import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  constructor(private http:HttpClient) { }

  

    getSongs()
    {
      return this.http.get("http://localhost:8080/api/open/songs");
    }

    getReviews(nm)
    {
      return this.http.get("http://localhost:8080/api/open/reviews/"+nm)
    }

    addReview(id,sName,rating,user,comment)
    {
      return this.http.put("http://localhost:8080/api/secure/add-review/"+id,
      {
        "songName":sName,
        "rating":rating,
        "userWhoReviewed":user,
        "reviewComment":comment
      },httpOptions);
    }

}
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Accept': 'application/json'
    
  })
};