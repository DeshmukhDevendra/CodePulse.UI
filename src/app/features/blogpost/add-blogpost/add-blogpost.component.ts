import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import { BlogPostService } from '../services/blog-post.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { ImageSelectorComponent } from '../../../shared/components/image-selector/image-selector.component';
import { ImageService } from '../../../shared/components/image-selector/image.service';

@Component({
  selector: 'app-add-blogpost',
  standalone: true,
  imports: [FormsModule,DatePipe,AsyncPipe,MarkdownModule,NgClass,ImageSelectorComponent],
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.css'
})
export class AddBlogpostComponent implements OnInit,OnDestroy{

  model:AddBlogPost;
  createBlogsPostSubscription$?: Subscription;
  imageSelectorSubscription$?: Subscription;
  categories$?:Observable<Category[]>;
  isImageSelectorVisible: boolean = false;
  
  constructor(private blogPostService:BlogPostService,
    private categorySerice:CategoryService,
    private router:Router,
    private imageService:ImageService){
    this.model = {
      title:'',
      shortDescription:'',
      urlHandle:'',
      content:'',
      featuredImageUrl:'',
      author:'',
      isVisible:true,
      publishedDate:new Date(),
      categories:[]
    };
  }
  ngOnInit(): void {
    this.categories$ = this.categorySerice.getAllCategories();

    this.imageSelectorSubscription$=this.imageService.onSelectImage()
      .subscribe({
        next:(selectedImg) =>{
          this.model.featuredImageUrl = selectedImg.url;
          this.closeImageSelector();
        }
      });
  }

  onFormSubmit():void{
    console.log(this.model);
    this.createBlogsPostSubscription$=this.blogPostService.createBlogPost(this.model)
    .subscribe({
      next: (response) => {
        this.router.navigateByUrl(`/admin/blogposts`);
      }
    });  
  }

  openImageSelector():void{
    this.isImageSelectorVisible = true;
  }

  closeImageSelector():void{
    this.isImageSelectorVisible = false;
  }

  ngOnDestroy(): void {
    this.createBlogsPostSubscription$?.unsubscribe();
    this.imageSelectorSubscription$?.unsubscribe();
  }
}
