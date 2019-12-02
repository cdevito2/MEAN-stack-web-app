import { Component, OnInit } from '@angular/core';
import {HttpService} from "../http.service";
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import {MatExpansionModule/*, MatAccordion*/} from '@angular/material';

import { Schema } from 'inspector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  id : String = "";
  constructor(private _http:HttpService) { }
  songs:Object;
  songs2:Object;
  reviews:Object;
  specificSong:Object;
  recentReview:String="";
  songIdforReview:String="";
  result:String = "";
  average:Number=0;
  keyword:String="";
  songs3:Object;
  searchResult:Object;
  
  ngOnInit() {
    this._http.getSongs().subscribe(data => {
      this.songs2 = data; 
      for (var song2 in this.songs2)
      {
      this.recentReview = this.songs2[song2].reviewId;
      this.songIdforReview = this.songs2[song2]._id;
     
      //this.getRecentReview(this.songIdforReview);
      var avg = this.calculateAverage(this.songIdforReview);
      
    }
  });
  
  }

  getSongsList()//this returns a list of 10 songs 
  {
    return this._http.getSongs().subscribe(data => { //get list of 10 songs sorted by popularity
      this.songs = data; 
      for (var song in this.songs)
      {
      this.recentReview = this.songs[song].reviewId;
      this.songIdforReview = this.songs[song]._id;
     
      this.getRecentReview(this.songIdforReview);
      
    }
  });
}
     
      calculateAverage(songId)
  {
    this._http.getReviews(songId).subscribe(data => {
      this.reviews = data;
      var average =0;
      var totalReviews =0;
      var totalRating=0;
      console.log(data)
      for (var review in this.reviews) //for each review for a songId calculate the average
      {
        totalReviews = totalReviews + 1
        console.log(totalReviews);
        totalRating = totalRating + this.reviews[review].rating;
        console.log(totalRating);
        this.average = totalRating / totalReviews;
        console.log("avg")
        console.log(this.average)
        this.updateSongAvg(this.average,totalReviews,this.reviews[review].songId)
        //update song with its average rating
        
      }
      
    });
  }

  getRecentReview(songId) //gets most recent review for a specific song
  {
    return this._http.getRecentReview(songId).subscribe(data => {
      //this.reviews = data;
      console.log(data);
      this.result = JSON.stringify(data);
      
      
    });
  }

 getReview() //this gets a specific review by entering its unique song id
  {
    return this._http.getReviews(this.id).subscribe(data => {
      this.reviews = data;
      console.log(this.reviews);
      
    });
  }


  updateSongAvg(avg,totalreviews,song) //on nginit need to update the average rating so it shows when song expanded
{
  console.log("updating")
  return this._http.updateSongAvg(avg,totalreviews,song).subscribe(data => {
   
    console.log(data);
    
  });
}


keywordSearch()
{
  return this._http.songSearch(this.keyword).subscribe(data => {
   console.log(data);
   this.searchResult = data;
    
  });
  
}




}
