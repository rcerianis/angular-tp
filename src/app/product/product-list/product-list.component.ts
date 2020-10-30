import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  private pageTitle: string = 'My header';
  public products: number[] = [1, 2];
  public objets: object[] = [
    {
      id: 1,
      name: 'Toto'
    },
    {
      id: 2,
      name: 'Tata2'
    },
    {
      id: 3,
      name: 'Trois'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }
  public getPageTitle(): string {
    return this.pageTitle;
  }
}
