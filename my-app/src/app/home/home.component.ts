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
  isCollapsed:Boolean = false;
  collapseButton :HTMLElement;
  //songName:String = "";
  ngOnInit() {
    

    /*for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
}*/
  }

  getSongsList()//this returns a list of 10 songs 
  {
    return this._http.getSongs().subscribe(data => {
      this.songs = data;
      //console.log(Object.keys(data).find;
      
      
    });
  }

  expandSong()
  {
    /*var coll = document.getElementsByClassName("expandable");
    var i;

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight){
          content.style.maxHeight = null;
        } else {
      content.style.maxHeight = content.scrollHeight + "px";
        } 
        });
      }*/

      var divColl = document.getElementsByClassName("content");
      
  }
  

 getReview() //this gets a specific review by entering its unique id
  {
    return this._http.getReviews(this.id).subscribe(data => {
      this.reviews = data;
      console.log(this.reviews);
      
    });
  }

}
