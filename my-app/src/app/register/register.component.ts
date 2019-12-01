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
  private token:String="";
  ngOnInit() {
  }
  validateEmail(email) 
  {
    //console.log("hi");
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
  }

  createUser()
  {
    var isValid = this.validateEmail(this.newEmail)
    if(!isValid)
    {
      this.registerResponse = "INVALID EMAIL FORMAT"
    }
    else{
      this._http.registerUser(this.newEmail,this.newPassword).subscribe(data => {
        console.log(data);
        this.token = data;
        localStorage.setItem('token',data)
        console.log("localstorage")
        console.log(localStorage.getItem('token'))
        this.response = data.toString();
        if (this.response == "email already exists")
      {
        this.registerResponse = "EMAIL IS ALREADY REGISTERED TO AN ACCOUNT";
        console.log("hi");
      }
      else if (this.newEmail == "" || this.newPassword == "")
        {
          this.registerResponse = "PLEASE ENTER ALL FIELDS";
        }
        else{
          this.router.navigate(['/login']);
        }
  
  
      });
    }

    
    
    //check if email is same as another email in user table
    //validate and make sure email is in correct format
    //prompt user if either field is empty
   
  }
}
