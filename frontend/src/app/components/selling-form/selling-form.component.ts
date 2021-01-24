import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {MarketplaceService} from "../../services/marketplace.service";
import {log} from "util";

@Component({
  selector: 'app-selling-form',
  templateUrl: './selling-form.component.html',
  styleUrls: ['./selling-form.component.scss']
})
export class SellingFormComponent implements OnInit {

  offerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private marketplaceService: MarketplaceService
  ) { }

  ngOnInit(): void {
    this.offerForm = this.fb.group({
      name: [''],
      description: [''],
      propertyAddress: [''],
      propertyType: [''],
      features: [''],
      price: [''],
      squareFootage: [''],
      imagesUrl: ['']
    })
  }

  async addOffer() {
    console.log(this.offerForm.value);
    const prop = [
      this.offerForm.value.name,
      this.offerForm.value.description,
      this.offerForm.value.propertyAddress,
      this.offerForm.value.propertyType,
      this.offerForm.value.features,
      this.offerForm.value.imagesUrl,
      this.offerForm.value.price,
      this.offerForm.value.squareFootage,
    ]
    await this.marketplaceService.sellMyProperty(prop);
    this.offerForm.reset();
    alert('Offer added!');
    this.router.navigateByUrl('/');
  }

}
