import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { IProduct } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  categories$ = this.productsService.categories$;

  productForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(3)]],
    imageUrl: ['', [Validators.required, Validators.minLength(3)]],
    price: ['', [Validators.required, Validators.min(0), Validators.pattern(/^[0-9]*\.?[0-9]*$/)]],
    categoryId: ['', [Validators.required,Validators.min(1), Validators.pattern(/^[0-9]*$/)]]
  });

  constructor(
    private productsService: ProductsService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.productForm.value, this.productForm.valid);
    if (this.productForm.valid) {
      const newProduct: IProduct = {
        ...this.productForm.value,
      };

      newProduct.price = +newProduct.price;
      this.productsService.createProduct(newProduct).subscribe(() => {
        this.productForm.reset();
        this.dialog.closeAll();
      });
    }
  }
}
