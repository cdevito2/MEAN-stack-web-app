import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpService} from "../http.service";
@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {
  userId:String="";
  userId2:String="";
  songId:String="";
  constructor(private router:Router,private http:HttpService) { }

  ngOnInit() {
  }

  enableUserAdmin()
  {
    return this.http.enableUserAdmin(this.userId).subscribe(data => {
      console.log(data);
      
      //then add review to song, use the songId to get the song then make a put which updates the reviewID array
      //and increments total number of reviews
      
    });
  }

  deactivate()
  {
    return this.http.toggle(this.userId2,false).subscribe(data => {
      console.log(data);}); //make a input field ot something and have response say contact admin to activate
  }
  activate()
  {
    return this.http.toggle(this.userId2,true).subscribe(data => {
      console.log(data);});
  }

  show()
  {
    return this.http.toggleSong(this.songId,true).subscribe(data => {
      console.log(data);});
  }
  hide()
  {
    return this.http.toggleSong(this.songId,false).subscribe(data => {
      console.log(data);});
  }



  logout()
  {
    this.router.navigate(['/login']);
  }

}
