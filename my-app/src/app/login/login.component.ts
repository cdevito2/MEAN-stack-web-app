import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpService} from "../http.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:String="";
  password:String="";
  
  loginResponse:String="";
  constructor(private router:Router,
    
    private _http:HttpService) { }

  ngOnInit() {
  }

  register()
  {
    this.router.navigate(['/register']);
  }
  validateEmail(email) 
  {
    //console.log("hi");
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
  }
  verifyLogin()
  { 
    var isValid = this.validateEmail(this.email)
    if(!isValid)
    {
      this.loginResponse = "INVALID EMAIL FORMAT"
    }
    else{
    this._http.loginUser(this.email,this.password).subscribe(data => {
      console.log(data);
      console.log(data.toString());
      this.loginResponse = data.toString();
      if(this.loginResponse == 'you entered invalid info')
      {
        this.loginResponse = "ERROR INVALID USERNAME/PASSWORD"
        
      }
      else{
        console.log("route to auth view");
        this.router.navigate(['/auth-view']);
      }
        
      
    });

  }
} 
  
  

}
