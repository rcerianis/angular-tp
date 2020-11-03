import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../shared/model/product';

@Pipe({
  name: 'productSearch'
})
export class ProductSearchPipe implements PipeTransform {

  transform(value: IProduct[], term: string): IProduct[] {
    if (Array.isArray(value)) {
//      const term: string = searchTerm.toLowerCase();

      return value.filter(product => {
        const name = product.productName.toLowerCase();
        return name.indexOf(term) > -1;
      });
    } else {
      //err.
      console.error('Given value must be an array!');
      return [];
    }
  }
  myTransform(products: IProduct[], searchTerm: string): IProduct[] {
    const term: string = searchTerm.toLowerCase();

    return products.filter((product: IProduct) => {
      const name: string = product.productName.toLowerCase();
      return name.indexOf(term) > -1;
    });
  }

}
