import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from '../api-service.service'

import { HttpClient,HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment'




@Component({
  selector: 'app-api-component',
  templateUrl: './api-component.component.html',
  styleUrls: ['./api-component.component.scss']
})
export class ApiComponentComponent implements OnInit {

  selectedFile;
  outImgUrl: string;
  

    // Define FormGroup to student's form
 
  constructor(private _apiService: ApiServiceService,
              private http:HttpClient
    ) { }


  ngOnInit() {

  }


  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile)
  }


  uploadFileFunc(){
    console.log("File upload")
    const fd = new FormData();

    fd.append('image', this.selectedFile, this.selectedFile.name);

    this.http.post(environment.apiUrl, fd)
    
    .subscribe(data =>{ 
      console.log("Heroku response   ",data)
      this.outImgUrl = data['img_url']
  
  },
      error => console.log("Heroku response   ",error)
    );
  }



   // Reset student form's values
}
