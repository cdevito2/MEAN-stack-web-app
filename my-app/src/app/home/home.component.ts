import { Component, OnInit } from '@angular/core';
import {HttpService} from "../http.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  id : String = "";
  constructor(private _http:HttpService) { }
  songs:Object;
  reviews:Object;
  //songName:String = "";
  ngOnInit() {
  }

  getSongsList()
  {
    return this._http.getSongs().subscribe(data => {
      this.songs = data;
      //console.log(Object.keys(data).find;
      
      
    });
  }

  

 getReview()
  {
    return this._http.getReviews(this.id).subscribe(data => {
      this.reviews = data;
      console.log(this.reviews);
      
    });
  }

}
