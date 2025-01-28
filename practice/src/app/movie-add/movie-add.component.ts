import { Component } from '@angular/core';
import { MovieService } from '../movie.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-add',
  templateUrl: './movie-add.component.html',
  styleUrls: ['./movie-add.component.css']
})
export class MovieAddComponent {

  movieForm:any;
  
  constructor(private service:MovieService ,private fb:FormBuilder , private router:Router ){
    this.movieForm=fb.group({
      title:["",[Validators.required]],
      director:["",[Validators.required]],
      year:[null,[Validators.required,Validators.min(1900)]]
    })
  }

  addMovie(){
    this.service.createMovie(this.movieForm.value).subscribe(()=>{
      this.router.navigate(['/'])
    })
  }


}
