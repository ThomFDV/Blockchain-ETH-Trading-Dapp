import {Component, OnInit, ViewChild} from '@angular/core';
import {OfferModel} from "../../offer.model";
import {DragScrollComponent} from "ngx-drag-scroll";

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss']
})
export class OfferDetailsComponent implements OnInit {

  @ViewChild('pictureShow', {read: DragScrollComponent}) ds: DragScrollComponent;
  picShown = 0;
  picNumber = 3;

  offer: OfferModel = {
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
  };

  constructor() { }

  ngOnInit(): void {
    this.autoMovePicture();
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

}
