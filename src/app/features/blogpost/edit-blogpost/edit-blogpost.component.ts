import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';
import { MarkdownModule } from 'ngx-markdown';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { UpdateBlogPost } from '../models/edit-blog-post.model';
import { ImageSelectorComponent } from "../../../shared/components/image-selector/image-selector.component";

@Component({
    selector: 'app-edit-blogpost',
    standalone: true,
    templateUrl: './edit-blogpost.component.html',
    styleUrl: './edit-blogpost.component.css',
    imports: [FormsModule, MarkdownModule, DatePipe, AsyncPipe, ImageSelectorComponent, NgClass]
})
export class EditBlogpostComponent implements OnInit, OnDestroy{
  id:string | null = null;
  routeSubscription?: Subscription;
  updateBlogPostSubscription?: Subscription;
  getBlogPostSubscription?: Subscription;
  deleteBlogPostSubscription?: Subscription;
  model?:BlogPost;
  categories$?: Observable<Category[]>;
  selectedCategories?: string[];
  isImageSelectorVisible: boolean = false;

  constructor(private route:ActivatedRoute,
              private blogPostService: BlogPostService,
              private categoryService: CategoryService,
              private router:Router){

  }

  ngOnInit(): void {

    this.categories$ = this.categoryService.getAllCategories();

    this.routeSubscription = this.route.paramMap.subscribe({
      next:(params) => {
        this.id = params.get('id');

        if(this.id){
          this.getBlogPostSubscription = this.blogPostService.getBlogPostById(this.id).subscribe({
            next:(response) =>{
              this.model = response;
              this.selectedCategories = response.categories.map(x => x.id);
            }
          })
        }
      }
    });
  }

  onFormSubmit():void{
    //Convert this model to request object
    if(this.model && this.id){
      var updateBlogPost:UpdateBlogPost ={
        author:this.model.author,
        content:this.model.content,
        featuredImageUrl:this.model.featuredImageUrl,
        publishedDate:this.model.publishedDate,
        isVisible:this.model.isVisible,
        shortDescription:this.model.shortDescription,
        title:this.model.title,
        urlHandle:this.model.urlHandle,
        categories:this.selectedCategories ?? []
      };

      this.updateBlogPostSubscription = this.blogPostService.updateBlogPost(this.id,updateBlogPost)
        .subscribe({
          next: (response) =>{
            this.router.navigateByUrl(`/admin/blogposts`);
          }
        });
    }
  }

  onDelete():void{
    if(this.id){
      this.deleteBlogPostSubscription = this.blogPostService.deleteBlogPost(this.id)
        .subscribe({
          next:(response) =>{
            this.router.navigateByUrl(`/admin/blogposts`);
          }
        })
    }
  }

  openImageSelector():void{
    this.isImageSelectorVisible = true;
  }

  closeImageSelector():void{
    this.isImageSelectorVisible = false;
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.updateBlogPostSubscription?.unsubscribe();
    this.getBlogPostSubscription?.unsubscribe();
    this.deleteBlogPostSubscription?.unsubscribe();
  }

}
