import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsComponent } from './components/products/products.component';
import { ProductsRoutingModule } from './products-routing/products-routing.module';
import { AddProductComponent } from './components/add-product/add-product.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';



@NgModule({
  declarations: [
    ProductsComponent,
    AddProductComponent,
    UpdateProductComponent,
    AddCategoryComponent
  ],
  imports: [
    ProductsRoutingModule,
    SharedModule
  ]
})
export class ProductsModule { }
