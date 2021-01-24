import {Component, OnInit, ViewChild} from '@angular/core';
import {DragScrollComponent} from "ngx-drag-scroll";
import {PropertyModel} from "../../offer.model";
import {MarketplaceService} from "../../services/marketplace.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss']
})
export class OfferDetailsComponent implements OnInit {

  @ViewChild('pictureShow', {read: DragScrollComponent}) ds: DragScrollComponent;
  picShown = 0;
  picNumber = 3;

  offer: PropertyModel;
  features: string[];
  pictures: string[];
  userAccount: any;

  constructor(private marketplaceService: MarketplaceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.autoMovePicture();
    this.getProperty(this.route.snapshot.params.id);
    this.getAccountAndBalance();
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
        this.offer = res;
        this.features = res.features.split(';');
        this.pictures = res.imagesUrl.split(';');
        this.userAccount = this.marketplaceService.account;

      })
      .catch(function(error) {
        console.error(error);
      });
  }

  buyProperty() {
    this.marketplaceService.buyOneProperty(this.offer.id, this.offer.price).then(() => {
      alert("Process succeed!");
    }).catch((err) => {
      alert("Something went wrong... Contact an admin.");
      console.error(err);
    });
  }

}
