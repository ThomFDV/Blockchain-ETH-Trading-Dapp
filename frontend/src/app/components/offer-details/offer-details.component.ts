import {Component, OnInit, ViewChild} from '@angular/core';
import {DragScrollComponent} from "ngx-drag-scroll";
import {PropertyModel} from "../../offer.model";
import {MarketplaceService} from "../../services/marketplace.service";

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss']
})
export class OfferDetailsComponent implements OnInit {

  @ViewChild('pictureShow', {read: DragScrollComponent}) ds: DragScrollComponent;
  picShown = 0;
  picNumber = 3;

  offer: PropertyModel = {
    id: 0,
    offerTitle: 'My amazing house',
    offerDescription: 'Beautiful house with all the needs close to it. Very modern and spacious.',
    addressLocation: '42 rue Capucine, 75010 Paris',
    propertyType: 'house',
    features: '4 bedrooms;2 bathrooms;2 floors;98m2 garden;swimming pool',
    price: 1099,
    squareFootage: 292,
    ownerAddress: '0x6a73036ea0327A38C4554cB8AC76FA99d445d902'
  };

  constructor(private marketplaceService: MarketplaceService) { }

  ngOnInit(): void {
    this.autoMovePicture();
    // this.getAccountAndBalance();
    this.getProperty(1);
  }

  moveLeft() {
    this.ds.moveLeft();
  }

  moveRight() {
    this.ds.moveRight();
  }

  autoMovePicture() {
    setTimeout(() => {
      if (this.picShown > this.picNumber - 1) {
        this.ds.moveTo(0);
        this.picShown = 0;
      } else {
        this.ds.moveRight();
        this.picShown += 1;
      }
      this.autoMovePicture();
    }, 4000)
  }

  getAccountAndBalance() {
    this.marketplaceService.getUserBalance().
    then(function(retAccount: any) {
      console.log('transfer.components :: getAccountAndBalance :: that.user');
      console.log(retAccount);
    }).catch(function(error) {
      console.error(error);
    });
  }

  getProperty(id: number) {
    this.marketplaceService.getOneProperty(id)
      .then((res: PropertyModel) => {
        console.info(res);
      })
      .catch(function(error) {
        console.error(error);
      });
  }

}
