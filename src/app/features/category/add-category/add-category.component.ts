import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnDestroy{
  
  category: AddCategoryRequest;

  private addCategorySubscription?:Subscription;

  constructor(private categoryService:CategoryService)
  {
    this.category = {
      name:'',
      urlHandle:''
    }
  }

  onFormSubmit()
  {
    this.addCategorySubscription?.add(this.categoryService.addCategory(this.category).
    subscribe({
      next:(response) =>{
        console.log(response);
      }
    }));
  }

  ngOnDestroy(){
    this.addCategorySubscription?.unsubscribe();
  }

}
