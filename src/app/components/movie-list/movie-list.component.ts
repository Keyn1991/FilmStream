import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../service/movie.service';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  showDetails: boolean; // Add this line
}

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getPopularMovies().subscribe(data => {
      this.movies = data.results.map((movie: Movie) => ({ ...movie, showDetails: true }));
    });
  }

  toggleDetails(movie: Movie) {
    movie.showDetails = !movie.showDetails;
  }
}
