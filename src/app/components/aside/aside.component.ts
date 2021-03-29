import {Component, Input, OnInit} from '@angular/core';
import {CartService} from '../../cart.service';
import { ToastService } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})

export class AsideComponent implements OnInit {
  cartCount: number;
  cartItems: any;
  showCart: boolean;
  showText: string;
  constructor(private cartService: CartService, private toastrService: ToastService) {
  }

  ngOnInit() {
    this.showCart = true;
    this.setText();
    this.cartCount = 0;
    console.log ('Aside');
    setInterval(this.getCartItems.bind(this), 2000);
  }

updateCart(product, qty) {
  this.cartService.updateCart(product, qty);
  this.getCartItems();
  if (qty > 0 ) {
  this.toastrService.info('Added 1 ' + product.product_name );
  }
  else {
    this.toastrService.error('Removed 1 ' + product.product_name );
  }
}
   myTimer() {
    var d = new Date();
    var t = d.toLocaleTimeString();
    console.log(' demo ' + t);
  }
  showCartItems()
  {
    this.getCartItems();
  }
  setText(): void {
      this.showText = 'Show';
  }

  getCartItems() {
    console.log ('getCartItems');
    this.cartItems = this.cartService.getCart();
    this.setText();
    this.cartCount = this.cartItems.count;
  }

}
