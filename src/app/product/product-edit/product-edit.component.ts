import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/shared/model/product.service';
import { IProduct, Product } from 'src/app/shared/model/product'
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
const HTTP_URL_PATTERN = '^((http[s]?):\\/)\\/?([^:\\/\\s]+)((\\/\\w+)*)([\\w\\-\\.]+[^#?\\s]+)(.*)?(#[\\w\\-]+)?$';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  public productForm: FormGroup;
  //This is used to store subscription in order to clean it with the component.
  private productSubscription: Subscription;

  constructor(fb: FormBuilder, route: ActivatedRoute, public productService: ProductService) {
    //We create our form product.
    this.productForm = fb.group({
      id: [null], //It is the same as "id:" new Control(null).
      productName: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(80)
        ]
      ],
      productCode: [''],
      releaseDate: [new Date()],
      description: [''],
      price: [0, Validators.min(0)],
      starRating: [3, [Validators.min(0), Validators.max(5)]],
      imageUrl: ['', Validators.pattern(HTTP_URL_PATTERN)]
    });

    let currentId$: Observable<number> = route.paramMap.pipe(
      map(params => params.get('id')),
      filter(id => id !== null),
      map(id => Number(id))
    );

    this.productSubscription = currentId$.pipe(
      switchMap(id => productService.getProductById$(id)),
      filter(product => product instanceof Product)
    ).subscribe(product => this.productForm.setValue(product));
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
  }

  public onSubmit(): void {
    let data: IProduct = this.productForm.value;
    if (this.productForm.valid) {
      this.productService.save(data).subscribe(
        product => console.log(`My product was saved ${product.id}`)
      );
    }
  }
}
