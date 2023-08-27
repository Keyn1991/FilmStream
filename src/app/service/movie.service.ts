import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { combineLatest, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  getPopularMovies(): Observable<any> {
    const token =
      'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Yjc0OTg3OGQ2ZTM4ZGI5OWQ1ZDlmZGMwODlmYzRmMiIsInN1YiI6IjYzZWU3ZGQwODhiMTQ4MDBkZGJiZjMwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OmBE_pXFPqyaXsz4DOY_O-904_OvEjRQcIceHwom5b8';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const url = `${this.apiUrl}/movie/popular`;
    return this.http.get(url, { headers });
  }

  getMovieDetails(movieId: number): Observable<any> {
    const detailsUrl = `${this.apiUrl}/movie/${movieId}`;
    const trailerUrl = `${this.apiUrl}/movie/${movieId}/videos`;

    const token =
      'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Yjc0OTg3OGQ2ZTM4ZGI5OWQ1ZDlmZGMwODlmYzRmMiIsInN1YiI6IjYzZWU3ZGQwODhiMTQ4MDBkZGJiZjMwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OmBE_pXFPqyaXsz4DOY_O-904_OvEjRQcIceHwom5b8';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const details$ = this.http.get(detailsUrl, { headers });

    const trailers$ = this.http.get(trailerUrl, { headers }).pipe(
      map((response: any) => {
        const trailers = response.results;
        return trailers || [];
      })
    );

    return combineLatest([details$, trailers$]).pipe(
      map(([details, trailers]) => {
        return { ...details, trailers };
      })
    );
  }
}
