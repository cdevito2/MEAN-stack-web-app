import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpService} from "../http.service";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router:Router,private _http:HttpService) { }
  private newEmail:String="";
  private newPassword:String="";
  private response:String="";
  private registerResponse:String="";
  ngOnInit() {
  }


  createUser()
  {
    this._http.registerUser(this.newEmail,this.newPassword).subscribe(data => {
      console.log(data);
      this.response = data.toString();
      if (this.response == "email already exists")
    {
      this.registerResponse = "EMAIL IS ALREADY REGISTERED TO AN ACCOUNT";
      console.log("hi");
    }
    else{
      this.router.navigate(['/login']);
      }



    });
    
    //check if email is same as another email in user table
    //validate and make sure email is in correct format
    //prompt user if either field is empty
   
  }
}