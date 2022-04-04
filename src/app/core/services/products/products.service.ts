import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, switchMap, tap } from 'rxjs';
import { ICategory, ICategoryDto, IProduct } from 'src/app/shared/models/product.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly API_URL = environment.apiUrl;
  loadProductsRequest$ = new ReplaySubject<void>(1);
  categories$ = this.loadProductsRequest$.pipe(
    switchMap(() => this.http.get<ICategory[]>(`${this.API_URL}product/category`))
  );

  products$ = this.loadProductsRequest$.pipe(
    switchMap(() => this.http.get<IProduct[]>(`${this.API_URL}product`))
  )

  constructor(private http: HttpClient ) {
    this.loadProducts();
  }

  loadProducts() {
    this.loadProductsRequest$.next();
  }

  getProductById(id: number) {
    return this.http.get<IProduct>(`${this.API_URL}product/${id}`);
  }

  createProduct(product: IProduct) {
    return this.http.post<IProduct[]>(`${this.API_URL}product`, product).pipe(tap(() => this.loadProducts()));
  }

  updateProduct(product: IProduct) {
    return this.http.put<IProduct[]>(`${this.API_URL}product/${product.id}`, product).pipe(tap(() => this.loadProducts()));
  }

  deleteProduct(id: number) {
    return this.http.delete<IProduct[]>(`${this.API_URL}product/${id}`).pipe(tap(() => this.loadProducts()));
  }

  createCategory(category: ICategoryDto) {
    return this.http.post<ICategory>(`${this.API_URL}product/category`, category)
  }
}
