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
  copyright:Object;

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


  updatePolicies(values)
  {
    var privacy = values.privacy.trim();
    var security = values.security.trim();
    var dcma =values.dcma.trim();
    var copyright = values.copyright.trim();
    
    if((!(security.length)) || (!(privacy.length)) || (!(dcma.length)) || (!(copyright.length)))
    {
      return alert('fill out the form ')
    }
    console.log(security);
    console.log(privacy);
    console.log(dcma);
    console.log(copyright);
    this.http.updatePolicies(
      
      security,
      privacy,
      dcma,
      copyright
    ).subscribe(data => {
      console.log(data);});

  }
  findCopyrightSongs()
  {
    return this.http.copyrightSongs().subscribe(data => {
      console.log("here")
      console.log(data);
      this.copyright = data;}
      
      );
  }

  navigateAuth()
  {
    this.router.navigate(['/auth-view']);
  }
  logout()
  {
    this.router.navigate(['/login']);
  }

}
