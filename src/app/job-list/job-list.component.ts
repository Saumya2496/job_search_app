import { Component } from '@angular/core';
import { Job } from '../model/job';
import { JobService } from '../service/job.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [NgFor, RouterLink, NgClass, NgIf],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})
export class JobListComponent {

  jobs: Job[] = [];
  favoriteJobs!: Job[];

  subscription$: Subscription | undefined;

  constructor(private jobService: JobService) {
  }

  ngOnInit() {
    this.getJobList();
    this.getFavoriteJobs();
  }

  getFavoriteJobs() {
    this.favoriteJobs = this.jobService.getFavoriteJobs();
  }

  isFavorite(jobId: number): boolean {
    return this.favoriteJobs.some(job => job.id === jobId);
  }

  getJobList() {
    this.subscription$ = this.jobService.getAllJobList().subscribe(
      (data) => {
        this.jobs = data;
      },
      (error) => {
        alert('Error fetching jobs:' + error.message);
      })
  }

  toggleFavorite(job: Job) {
    this.jobService.addAndRemoveFavoriteJobs(job);
  }

  ngOnDestroy() {
    this.subscription$?.unsubscribe();
  }
}
