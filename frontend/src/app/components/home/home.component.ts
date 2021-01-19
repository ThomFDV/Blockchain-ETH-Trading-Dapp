import { Component, OnInit } from '@angular/core';
import {OfferModel} from "../../offer.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  offers: OfferModel[] = [
    {
      id: 0,
      name: 'My amazing house',
      description: 'Beautiful house with all the needs close to it. Very modern and spacious.',
      price: 1099,
      squareFootage: 292,
      propertyType: 'house',
      features: [
        '4 bedrooms',
        '2 bathrooms',
        '2 floors',
        '98m2 garden',
        'swimming pool'
      ]
    },
    {
      id: 1,
      name: 'My amazing house',
      description: 'Beautiful house with all the needs close to it. Very modern and spacious.',
      price: 1099,
      squareFootage: 292,
      propertyType: 'house',
      features: [
        '4 bedrooms',
        '2 bathrooms',
        '2 floors',
        '98m2 garden'
      ]
    },
    {
      id: 2,
      name: 'My amazing house',
      description: 'Beautiful house with all the needs close to it. Very modern and spacious.',
      price: 899,
      squareFootage: 292,
      propertyType: 'apartment',
      features: [
        '3 bedrooms',
        '1 bathrooms',
        '1 floors',
        '53m2 garden'
      ]
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
