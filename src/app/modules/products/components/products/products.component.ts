import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { IProduct } from 'src/app/shared/models/product.model';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { AddProductComponent } from '../add-product/add-product.component';
import { UpdateProductComponent } from '../update-product/update-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products$ = this.productService.products$;

  displayColumns: string[] = ['imageUrl','id','title', 'description', 'price', 'category', 'actions'];

  constructor(private productService: ProductsService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onSelectAddProduct() {
    this.dialog.open(AddProductComponent);
  }

  onSelectAddCategory() {
    this.dialog.open(AddCategoryComponent);
  }

  onDelete(id: number) {
    this.productService.deleteProduct(id).subscribe();
  }

  onUpdate(product: IProduct) {
    this.dialog.open(UpdateProductComponent, {
      data: product
    });
  }

}
