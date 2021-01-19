import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-selling-form',
  templateUrl: './selling-form.component.html',
  styleUrls: ['./selling-form.component.scss']
})
export class SellingFormComponent implements OnInit {

  offerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.offerForm = this.fb.group({
      name: [''],
      description: [''],
      propertyType: [''],
      price: [''],
      squareFootage: [''],
      features: ['']
    })
  }

  addOffer() {
    console.log(this.offerForm.value);
    this.offerForm.reset();
    alert('Offer added!');
    this.router.navigateByUrl('/');
  }

}
