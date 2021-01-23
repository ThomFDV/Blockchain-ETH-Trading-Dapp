import { Component, OnInit } from '@angular/core';
import {PropertyModel} from "../../offer.model";
import {MarketplaceService} from "../../services/marketplace.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  offers: PropertyModel[] = [
    {
      id: 0,
      offerTitle: 'My amazing house',
      offerDescription: 'Beautiful house with all the needs close to it. Very modern and spacious.',
      addressLocation: '42 rue Capucine, 75010 Paris',
      propertyType: 'house',
      features: '4 bedrooms;2 bathrooms;2 floors;98m2 garden;swimming pool',
      price: 1099,
      squareFootage: 292,
      ownerAddress: '0x6a73036ea0327A38C4554cB8AC76FA99d445d902'
    },
    {
      id: 1,
      offerTitle: 'My amazing house 2',
      offerDescription: 'Beautiful house with all the needs close to it. Very modern and spacious. 2',
      addressLocation: '12 rue Capucine, 75010 Paris',
      propertyType: 'house',
      features: '3 bedrooms;2 bathrooms;2 floors;69m2 garden',
      price: 980,
      squareFootage: 182,
      ownerAddress: '0xa4a5b657b396AEA33A547c5C59974736c0981640'
    },
    {
      id: 2,
      offerTitle: 'My amazing house 3',
      offerDescription: 'Beautiful loft with all the needs close to it. Very modern and spacious. 3',
      addressLocation: '28 rue Eleane, 75001 Paris',
      propertyType: 'loft',
      features: '4 bedrooms;2 bathrooms;2 floors;38m2 balcony',
      price: 1190,
      squareFootage: 142,
      ownerAddress: '0xb7D4D3024a221bF09165466De3703e57e2501F20'
    }
  ];

  constructor(private marketplaceService: MarketplaceService) { }

  ngOnInit(): void {
    this.getProperties();
  }

  getFeatures(id: number) {
    return this.offers[id].features.split(';');
  }

  getProperties() {
    this.marketplaceService.getAllProperties().then((res: PropertyModel[]) => {
      this.offers = res;
    }).catch((err) => {
      console.error(err);
    });
  }

}
