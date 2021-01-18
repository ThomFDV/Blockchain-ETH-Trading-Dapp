import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {SellingFormComponent} from "./components/selling-form/selling-form.component";


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'sell',
    component: SellingFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
