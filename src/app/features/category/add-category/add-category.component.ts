import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddCategoryRequest } from '../models/add-category-request.model';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {
  
  category: AddCategoryRequest;

  constructor()
  {
    this.category = {
      name:'',
      urlHandle:''
    }
  }

  onFormSubmit()
  {
    console.log(this.category);
  }

}
