import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProductsService } from 'src/app/core/services/products/products.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  addCategoryForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]]
  });

  constructor(
    private productsService: ProductsService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.addCategoryForm.valid) {
      this.productsService.createCategory(this.addCategoryForm.value).subscribe(() => {
        this.addCategoryForm.reset();
        this.dialog.closeAll();
      });
    }
  }

}
