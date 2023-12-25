import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogPostService } from '../services/blog-post.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-blogpost-list',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './blogpost-list.component.html',
  styleUrl: './blogpost-list.component.css'
})
export class BlogpostListComponent implements OnInit{
  
  blogPosts$?:Observable<BlogPost[]>;

  constructor(private blogPostService:BlogPostService){

  }

  ngOnInit(): void {
    this.blogPosts$ = this.blogPostService.getAllBlogPosts()
  }

}
