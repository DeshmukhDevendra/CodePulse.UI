import { Component, OnDestroy } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BlogPostService } from '../services/blog-post.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-add-blogpost',
  standalone: true,
  imports: [FormsModule,DatePipe,MarkdownModule],
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.css'
})
export class AddBlogpostComponent implements OnDestroy{

  model:AddBlogPost;
  createBlogsPostSubscription$?: Subscription;

  constructor(private blogPostService:BlogPostService,
    private router:Router){
    this.model = {
      title:'',
      shortDescription:'',
      urlHandle:'',
      content:'',
      featuredImageUrl:'',
      author:'',
      isVisible:true,
      publishedDate:new Date()
    };
  }

  onFormSubmit():void{
    this.createBlogsPostSubscription$=this.blogPostService.createBlogPost(this.model)
    .subscribe({
      next: (response) => {
        this.router.navigateByUrl(`/admin/blogposts`);
      }
    });  
  }

  ngOnDestroy(): void {
    this.createBlogsPostSubscription$?.unsubscribe();
  }
}
