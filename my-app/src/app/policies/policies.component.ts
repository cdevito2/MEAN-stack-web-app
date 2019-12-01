import { Component, OnInit } from '@angular/core';
import {HttpService} from "../http.service";
@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.css']
})
export class PoliciesComponent implements OnInit {
  policies:Object;
  constructor(private http:HttpService) { }

  ngOnInit() 
  {
    return this.http.getPolicy().subscribe(data => {
      console.log(data);
      this.policies = data
      //then add review to song, use the songId to get the song then make a put which updates the reviewID array
      //and increments total number of reviews
      
    });
  }

}
