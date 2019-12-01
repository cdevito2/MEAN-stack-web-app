import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  constructor(private http:HttpClient) { }

    createUser(email,password,isAdmin,isActive)//create user
    {
      return this.http.post("http://localhost:8080/api/secure/user",
      {
        "email":email,
        "password":password,
        "isAdmin":isAdmin,
        "isActive":isActive
        
      },
      httpOptions
      );
    }

    getSongs()//get list of songs
    {
      return this.http.get("http://localhost:8080/api/open/songs");
    }

    getReviews(nm) //get reviews for specific song
    {
      return this.http.get("http://localhost:8080/api/open/reviews/"+nm)
    }

    getRecentReview(nm) //get reviews for specific song
    {
      return this.http.get("http://localhost:8080/api/open/recentreviews/"+nm)
    }

    makeReview(id,rating,user,comment) //add a review to song
    {
      return this.http.put("http://localhost:8080/api/secure/add-review/"+id,
      {
        "songId":id,
        "rating":rating,
        "userId":user,
        "reviewComment":comment,
        "submittedOn":Date.now()
      },httpOptions);
    }

    createSong(title,artist,album,year,track,genre) //create a new song
    {
      return this.http.post("http://localhost:8080/api/secure/song",
      {
        "title":title,
        "artist":artist,
        "album":album,
        "year":year,
        "track":track,
        "genre":genre
      },httpOptions);
    }

    

    //Add a rating (1-5, star etc) to reviews created by the user.
    //POST /api/secure/song/:id
    addReview(songId,reviewId) //add a rating to review created by user
    {
      
      //update the record of the given song ID with JSON array of properties sent in the body.
      return this.http.put("http://localhost:8080/api/secure/song/"+songId,
      {
        "reviewId":reviewId
        
      }
      )
    }



    registerUser(email,password)
    {
      console.log(email);
      console.log(password);
      return this.http.post("http://localhost:8080/api/open/register",
      {
        "email":email,
        "password": password
      },{responseType: 'text'})
    }

    loginUser(email,password)
    {
      console.log(email);
      console.log(password);
      return this.http.post("http://localhost:8080/api/open/login",
      {
        "email":email,
        "password": password
      },httpOptions)
    }

    loginAdmin(email,password)
    {
      console.log(email);
      console.log(password);
      return this.http.post("http://localhost:8080/api/open/adminlogin",
      {
        "email":email,
        "password": password
      },httpOptions)
    }
    
    enableUserAdmin(userId)
    {
      return this.http.put("http://localhost:8080/api/admin/enable/"+userId,
      {
        isAdmin:true
      })
    }

    toggle(userId,trueOrFalse)
    {
      return this.http.put("http://localhost:8080/api/admin/toggle/"+userId,
      {
        isActive:trueOrFalse
      })
    }
    
    toggleSong(songId,trueOrFalse)
    {
      return this.http.put("http://localhost:8080/api/admin/togglesong/"+songId,
      {
        visible:trueOrFalse
      })
    }
    updatePolicies(security,privacy,dcma,copyright)
    {
      console.log("here")
      console.log(security);
      console.log(privacy);
      console.log(dcma);
      console.log(copyright);
      //return this.http.post("http:/localhost:8080/api/admin/update",{body})
      return this.http.post("http://localhost:8080/api/admin/update",
      {
        "security":security,
        "privacy":privacy,
        "dcma":dcma,
        "copyright":copyright
      })

      
    }




}





const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Accept': 'application/json'
    
  })
};