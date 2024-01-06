import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../../blogpost/services/blog-post.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../../blogpost/models/blog-post.model';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  blogs$?:Observable<BlogPost[]>;

  constructor(private blogPostService:BlogPostService){}

  ngOnInit(): void{
    this.blogs$ = this.blogPostService.getAllBlogPosts();
  }
}
