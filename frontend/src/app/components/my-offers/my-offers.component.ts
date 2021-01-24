import { Component, OnInit } from '@angular/core';
import {PropertyModel} from "../../offer.model";
import {MarketplaceService} from "../../services/marketplace.service";

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.scss']
})
export class MyOffersComponent implements OnInit {

  offers: PropertyModel[];

  constructor(private marketplaceService: MarketplaceService) { }

  ngOnInit(): void {
    this.getProperties();
  }

  getFeatures(property: PropertyModel) {
    return property.features.split(';');
  }

  getPicture(property: PropertyModel) {
    return property.imagesUrl.split(';')[0];
  }

  async getProperties() {
    await this.marketplaceService.getAllProperties().then((res: PropertyModel[]) => {
      this.offers = res.filter((offer) => offer.ownerAddress === this.marketplaceService.account);
    }).catch((err) => {
      console.error(err);
    });
  }

}
