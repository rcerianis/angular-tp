import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../shared/model/product';
import { ProductService } from '../../shared/model/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  private pageTitle: string = 'Product list';
  public a: number = 3.14;
  public searchTerm: string = '';
  public displayImage: boolean = true;
  public products: IProduct[] = [];

  constructor(public productService: ProductService) {
    this.products = productService.getProducts();
  }

  ngOnInit(): void {
  }
  public getPageTitle(): string {
    return this.pageTitle;
  }
  public toggleImage(): void {
    this.displayImage = !this.displayImage;
  }
  public getFilteredProducts(): IProduct[] {
    const term = this.searchTerm.toLowerCase();
    return this.products.filter(product => {
      const name = product.productName.toLowerCase();
      return name.indexOf(term) > -1;
    });
  }
}
