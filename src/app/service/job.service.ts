import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Job, JobDetails } from '../model/job';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private job_url = '/jobs';

  private favoriteJobs: Job[] = [];

  constructor(private http: HttpClient) { }

  getFavoriteJobs():Job[]{
    const storedFavourites = localStorage.getItem('favoriteJobs');
    if (storedFavourites) {
      this.favoriteJobs = JSON.parse(storedFavourites);
    }
    return this.favoriteJobs;
  };

  addAndRemoveFavoriteJobs(job: Job) {
    const index = this.favoriteJobs.findIndex(favoriteJob => favoriteJob.id === job.id);
    if (index === -1) {
      this.favoriteJobs.push(job);
    } else {
      this.favoriteJobs.splice(index, 1);
    }
    localStorage.setItem('favoriteJobs', JSON.stringify(this.favoriteJobs));
  }

  
  getAllJobList(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.job_url}`)
      .pipe(catchError((error) => this.errorHandler(error)));
  }

  getJobDetailsById(id: number): Observable<JobDetails> {
    return this.http.get<JobDetails>(`${this.job_url}/${id}`)
      .pipe(catchError((error) => this.errorHandler(error)));
  }

  errorHandler(error: Error) {
    return throwError(error);
  }
}
