import { Component } from '@angular/core';
import { MovieService } from '../movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent {

  editForm:any;
  movieId:any;
  constructor(private movieService:MovieService,private route:ActivatedRoute,private fb:FormBuilder, private router:Router){
    this.editForm=fb.group({
      title:["",[Validators.required]],
      director:["",[Validators.required]],
      year:["",[Validators.required,Validators.min(1900) , Validators.max(new Date().getFullYear())]]
    })
  }
 ngOnInit(): void{
  this.movieId=this.route.snapshot.paramMap.get('id');
  this.movieService.getMovieById(this.movieId).subscribe((movie)=>{
    this.editForm.patchValue(movie);

  })
 }
  updateFunc():void{
      this.movieService.updateMovie({...this.editForm.value , id:this.movieId}).subscribe(()=>{
        this.router.navigate(["/"])
      })

}
}
