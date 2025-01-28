import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Movie } from './movie/movie.module';
@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = "https://opulent-bassoon-66rgqjwjwpq24qj5-3000.app.github.dev/movies";
  constructor(private http:HttpClient) { }

  getMovies():Observable<Movie[]>{
    return this.http.get<Movie[]>(`${this.apiUrl}`)
  }
  getMovieById(id:number):Observable<Movie>{
    return this.http.get<Movie>(`${this.apiUrl}/${id}`);
  }
  createMovie(movie:Movie):Observable<Movie>{
    return this.http.post<Movie>(`${this.apiUrl}`,movie);
  }

  deleteMovie(id:number):Observable<Movie>{
    return this.http.delete<Movie>(`${this.apiUrl}/${id}`)
  }

  updateMovie(movie:Movie):Observable<Movie>{
    return this.http.put<Movie>(`${this.apiUrl}/${movie.id}`,movie)
  }
}
