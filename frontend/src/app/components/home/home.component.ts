import { Component, OnInit } from '@angular/core';
import {PropertyModel} from "../../offer.model";
import {MarketplaceService} from "../../services/marketplace.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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
      this.offers = res;
      this.offers.shift();
    }).catch((err) => {
      console.error(err);
    });
  }

}
