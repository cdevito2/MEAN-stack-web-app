import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpService} from "../http.service";

@Component({
  selector: 'app-auth-view',
  templateUrl: './auth-view.component.html',
  styleUrls: ['./auth-view.component.css']
})
export class AuthViewComponent implements OnInit {

  constructor(private router:Router,private http:HttpService) { }
  songName:String = "";
  objId:String="";
  rating:Number=0;
  userWhoReviewed:String="";
  comment:String="";
  review:Object;

  title:String = "";
  artist:String = "";
  album:String = "";
  genre:String = "";
  track:Number=0;
  year:Number=0;

  ngOnInit() {
  }
  logout()
  {
    this.router.navigate(['/login']);
  }
  makeReview(){
    return this.http.addReview(this.objId,this.songName,this.rating,this.userWhoReviewed,this.comment).subscribe(data => {
      this.review = data;
      console.log(this.review);
      
    });
  }

  createSong(){
    return this.http.createSong(this.title,this.artist,this.album,this.year,this.track,this.genre).subscribe(data => {
      this.review = data;
      console.log(this.review);
      
    });
  }

}
