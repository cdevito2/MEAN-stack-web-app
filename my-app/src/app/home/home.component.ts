import { Component, OnInit } from '@angular/core';
import {HttpService} from "../http.service";
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import {MatExpansionModule/*, MatAccordion*/} from '@angular/material';

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
  specificSong:Object;
  recentReview:String="";
  songIdforReview:String="";
  result:String = "";
  x:String = "";
  test:Object;
  //songName:String = "";
  ngOnInit() {
  
  }

  getSongsList()//this returns a list of 10 songs 
  {
    return this._http.getSongs().subscribe(data => {
      this.songs = data; 
      for (var song in this.songs)
      {
      this.recentReview = this.songs[song].reviewId;
      this.songIdforReview = this.songs[song]._id;
     
      this.getRecentReview(this.songIdforReview);
    
    }
  });
}
     
      //recentReview is an array of reviewId's stored in a song
     //i need to define a field in review that is the exact time of creation
     //then for each song in this.songs i call the function get recent review
     //this returns the most recent review for a song
     //i somehow convert the this.songs[song] and the returned result to string, add them, then
     //convert back to a json object by json.parse()
        
      /*this._http.getReviews(this.songIdforReview).subscribe(data => {
         console.log("data below:");
          console.log(JSON.stringify(data));
          console.log(JSON.stringify(data)+ JSON.stringify(this.songs[song]))
          this.songs[song] = JSON.parse(JSON.stringify(data)+ JSON.stringify(this.songs[song]));
          //this.result = JSON.stringify(this.songs+JSON.stringify(data));
          //this.songs = JSON.parse(this.result.toString());
          //console.log(this.songs.toString()+JSON.stringify(data));
          //console.log(this.result);
        });
      
      
      }
    });*/
  
    /*getRecent()
    {
      for (var songs in this.songs)
      {

      }
    }*/
  
  getRecentReview(songId)
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

}
