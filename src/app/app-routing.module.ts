import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'products', component: ProductComponent, children: [
    { path: '', component: ProductListComponent },
    { path: ':id', component: ProductDetailComponent },
    { path: ':id/edit', component: ProductEditComponent }//Changed. Will be changed when we'll use forms.
  ]},
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },//Redirect to welcome.
  { path: '**', component: PageNotFoundComponent }//Wildcard route for a 404 page.
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
