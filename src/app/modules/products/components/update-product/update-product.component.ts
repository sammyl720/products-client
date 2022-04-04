import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { IProduct } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
  product!: IProduct;

  categories$ = this.productsService.categories$;

  productForm:FormGroup;

  constructor(
    private productsService: ProductsService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: IProduct
  ) {
    this.product = data;

    this.productForm = this.fb.group({
      title: [this.product.title, [Validators.required, Validators.minLength(3)]],
      description: [this.product.description, [Validators.required, Validators.minLength(3)]],
      imageUrl: [this.product.imageUrl, [Validators.required, Validators.minLength(3)]],
      price: [this.product.price, [Validators.required, Validators.min(0), Validators.pattern(/^[0-9]*\.?[0-9]*$/)]],
      categoryId: [this.product.categoryId, [Validators.required,Validators.min(1), Validators.pattern(/^[0-9]*$/)]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.productForm.valid) {
      const updatedProduct: IProduct = {
        ...this.product,
        ...this.productForm.value,
      };

      updatedProduct.price = +updatedProduct.price;
      this.productsService.updateProduct(updatedProduct).subscribe(() => {
        this.productForm.reset();
        this.dialog.closeAll();
      });
    }
  }

}
