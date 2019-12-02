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
  song:Object;
  reviewId:String="";
  title:String = "";
  artist:String = "";
  album:String = "";
  genre:String = "";
  track:Number=0;
  year:Number=0;
  email:String="";
  password:String="";

  //stuff for add song and rating at same time
  ratingAddSong:Number=0;
  userWhoReviewedAddSong:String="";
  commentAddSong:String="";
  ngOnInit() {
    
  }
  
  logout()
  {
    this.router.navigate(['/login']); //navigate back to login page if button is clicked
  }
  makeReview(){//create a review
    return this.http.makeReview(this.songId,this.rating,this.userWhoReviewed,this.comment).subscribe(data => {
      this.review = data;
      console.log(this.review);
      
      //then add review to song, use the songId to get the song then make a put which updates the reviewID array
      //and increments total number of reviews
      
    });
  }

  createSong(){ //this creates a song  and if fields entered also creates a review and adds review to song
      if(!(this.title.length) || !(this.artist.length))
      {
        return alert("please enter in all fields")
      }
    
      this.http.createSong(this.title,this.artist,this.album,this.year,this.track,this.genre).subscribe(data => {
      this.song = data;
      console.log(this.userWhoReviewedAddSong);
      
      console.log(this.song.toString());//this returns the songId created 
      if(this.userWhoReviewedAddSong != ""){
      console.log("here in if statmenet")
      this.createSongAndReviewSameTime(this.song.toString(),this.ratingAddSong,this.userWhoReviewedAddSong,this.commentAddSong)
      }
      //now add reviewID to array in songs and increment number of reviews by 1
    });
      
      
      
    }

    //need to add create song and review same time
    createSongAndReviewSameTime(songId,ratingAddSong,userWhoReviewedAddSong,commentAddSong)
    {
      console.log("createsongandreview")
      return this.http.makeReview(songId,ratingAddSong,userWhoReviewedAddSong,commentAddSong).subscribe(data => {
        this.review = data;
        console.log(this.review);
        this.updateSongwithReview(this.song.toString(),this.review.toString())
      });
      //last step is to add the review ID to the song that was created(may not be necessary)
      
    }
  
  updateSongwithReview(songIdToAdd,reviewToAdd)//this gets called once song and review created at same time
  {
    console.log("songIdtoadd");
    console.log(songIdToAdd);
    console.log("reviewId to add to array")
    console.log(reviewToAdd)
    return this.http.addReview(songIdToAdd,reviewToAdd).subscribe(data => {
      //this.review = data;
      console.log(data.toString());

    });
  }

  addReviewToSong()
  { //this adds a review to a song 
    return this.http.addReview(this.objId,this.reviewId).subscribe(data => {
      //this.review = data;
      console.log(data);
  });
  }
  adminStuff()
  { //login admin 
    return this.http.loginAdmin(this.email,this.password).subscribe(data => {
      //this.review = data;
      console.log(data);
      if (data["isAdmin"] == true)
      {
        this.router.navigate(['/admin-view']);
      }
      else{
        alert("not admin")
      }
  });
  }

  
}
