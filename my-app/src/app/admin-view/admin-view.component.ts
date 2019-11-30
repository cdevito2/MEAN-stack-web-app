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


  logout()
  {
    this.router.navigate(['/login']);
  }

}
