import {Component, OnInit} from '@angular/core';
import {AppTab} from './market/models/tab.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  selectedTab: AppTab;
  cartProductsQuantity = 0; 

  ngOnInit(): void {
    this.selectedTab = 'PRODUCTS' as AppTab;
  }

  selectTab(tab: AppTab) {
    this.selectedTab = tab;
  }

  onCartProductAdded(quantity: number){
    this.cartProductsQuantity += quantity;
  }

  onCartProductRemoved(quantity: number){
    this.cartProductsQuantity -= quantity;
  }

  onCartCleared(){
    this.cartProductsQuantity = 0;
  }
}
