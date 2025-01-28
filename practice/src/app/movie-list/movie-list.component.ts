import { Component } from '@angular/core';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';
import { Movie } from '../movie/movie.module';
@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent {
  text:string='';
    movies:any =[];
    sortBy:any='title';
    filteredMovies:any=[];
    isAscending:boolean=true;

  constructor(private movieService:MovieService , private router:Router){}
  ngOnInit(): void{
    this.loadFunc();
  }
  loadFunc(){
    this.movieService.getMovies().subscribe((data)=>{
      this.movies=data;
      this.filteredMovies=data;
    })
  }

  editFunc(id:number){
    this.router.navigate([`/edit/${id}`])
  }

  deleteFunc(id:number){
    this.movieService.deleteMovie(id).subscribe(()=>{
      this.movies = this.movies.filter((movie:Movie)=>{
        movie.id !==id;
      })
    })
    this.loadFunc();
  }

  filter(){
    if(this.text){
      this.filteredMovies=this.movies.filter((movie:Movie)=>{
        return movie.title.toLowerCase().includes(this.text) || movie.director.toLowerCase().includes(this.text)
      })
    }
    else{
      this.filteredMovies=this.movies;
    }

  }

  sortMovies():void{
    this.filteredMovies.sort((a: Movie, b: Movie) => {
      const key = this.sortBy as keyof Movie;
      if (a[key] < b[key]) {
        return this.isAscending ? -1 : 1;
      } else if (a[key] > b[key]) {
        return this.isAscending ? 1 : -1;
      }
      return 0;
    });
  }

  Toggle(){
    this.isAscending = !this.isAscending;
    this.sortMovies();
  }


}
