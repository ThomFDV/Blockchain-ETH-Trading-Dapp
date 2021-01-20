import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {SellingFormComponent} from "./components/selling-form/selling-form.component";
import {OfferDetailsComponent} from "./components/offer-details/offer-details.component";


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'sell',
    component: SellingFormComponent
  },
  {
    path: 'offer-details/:id',
    component: OfferDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
