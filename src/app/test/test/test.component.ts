import { Component, OnInit } from '@angular/core';
import { of, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
    private ob$: Observable<number> = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
    .pipe(filter(v => v%2 === 0));
  constructor() {
      this.ob$.subscribe(
          next => console.log('next', next),
          err => console.log('error', err),
          () => console.log('Completed')
      );
  }

  ngOnInit(): void {
      console.log('TestComponent.ngOnInit()');

  }

}
