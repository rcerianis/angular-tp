import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../../shared/model/product.service';
import { Product } from './../../shared/model/product';
import { Observable } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  public product$: Observable<Product>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    let currentId$: Observable<number> = route.paramMap.pipe(
      map(params => params.get('id')),
      filter(id => id !== null),
      map(id => Number(id))
    );

    console.log(currentId$);
    
    this.product$ = currentId$.pipe(
      switchMap(id => productService.getProductById$(id))
    );
  }

  ngOnInit(): void {
  }

  public goToProducts(): void {
    this.router.navigate(['/products']);
  }
}
