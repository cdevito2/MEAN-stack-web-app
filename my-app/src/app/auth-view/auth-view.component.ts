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
  //songName:String = "";
  objId:String="";
  songId:String="";
  rating:Number=0;
  userWhoReviewed:String="";
  comment:String="";
  review:Object;
  reviewId:String="";
  title:String = "";
  artist:String = "";
  album:String = "";
  genre:String = "";
  track:Number=0;
  year:Number=0;


  //stuff for add song and rating at same time
  ratingAddSong:Number=0;
  userWhoReviewedAddSong:String="";
  commentAddSong:String="";
  ngOnInit() {
    
  }
  logout()
  {
    this.router.navigate(['/login']);
  }
  makeReview(){//create a review
    return this.http.makeReview(this.songId,this.rating,this.userWhoReviewed,this.comment).subscribe(data => {
      this.review = data;
      console.log(this.review);
      
      
      
    });
  }

  createSong(){
    return this.http.createSong(this.title,this.artist,this.album,this.year,this.track,this.genre).subscribe(data => {
      this.review = data;
      
      //now create a review for the song 
      //String _id = {{this.review.}};
      //this.http.makeReview(/*id*/,this.ratingAddSong,this.userWhoReviewedAddSong,this.commentAddSong)
      //then update the song to have a review
      console.log(this.review);
      
    });
  }
  addReviewToSong(){ //this adds a review to a song 
    return this.http.addReview(this.objId,this.reviewId).subscribe(data => {
      //this.review = data;
      console.log(data);
  });
  }
}
