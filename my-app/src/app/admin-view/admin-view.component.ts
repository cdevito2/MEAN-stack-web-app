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

  enableUserAdmin() //enable a specific user to have admin priveleges given user id
  {
    return this.http.enableUserAdmin(this.userId).subscribe(data => {
      console.log(data);
      });
  }

  deactivate()//deactivate user
  {
    return this.http.toggle(this.userId2,false).subscribe(data => {
      console.log(data);}); //make a input field ot something and have response say contact admin to activate
  }
  activate() //activate user if they were deactivated
  {
    return this.http.toggle(this.userId2,true).subscribe(data => {
      console.log(data);});
  }

  show()//make song visible
  {
    return this.http.toggleSong(this.songId,true).subscribe(data => {
      console.log(data);});
  }
  hide() //make song not visible
  {
    return this.http.toggleSong(this.songId,false).subscribe(data => {
      console.log(data);});
  }


  updatePolicies(values) //admin functionality to create policies
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
