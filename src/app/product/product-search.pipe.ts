import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from './product-list/product-list.component';

@Pipe({
  name: 'productSearch'
})
export class ProductSearchPipe implements PipeTransform {

  transform(products: IProduct[], searchTerm: string): IProduct[] {
    const term: string = searchTerm.toLowerCase();

    return products.filter((product: IProduct) => {
      const name: string = product.productName.toLowerCase();
      return name.indexOf(term) > -1;
    });
  }

}
