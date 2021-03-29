import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CartService} from '../../../cart.service';
import {ToastService} from 'ng-uikit-pro-standard';
import {ProductsService} from '../../../services/products/products.service';
import {FilterSortService} from '../../../services/filter-sort.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-searched-product',
  templateUrl: './searched-product.component.html',
  styleUrls: ['./searched-product.component.css']
})
export class SearchedProductComponent implements OnInit, OnChanges {
  @Input('products') products: any;
  @Input() category;
  @Input() sortKey;
  @Output() cartCountEmitter = new EventEmitter<any>();
  filteredProducts: any;

  maxRating = [0, 1, 2, 3, 4, 5];

  constructor(private productsService: ProductsService,
              private filterService: FilterSortService,
              private cartService: CartService,
              private router: Router,
              private toastrService: ToastService) {
  }

  ngOnInit() {
    this.reloadData();
    this.products = this.productsService.getProductStockList();
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      const changedProp = changes[propName];
      const to = JSON.stringify(changedProp.currentValue);
      if (changedProp.isFirstChange()) {
        console.log(`Initial value of ${propName} set to ${to}`);
      } else {
        const from = JSON.stringify(changedProp.previousValue);
        console.log(`${propName} changed from ${from} to ${to}`);
      }
    }
    this.reloadData();
  }

  updateCart(product, qty) {
    this.cartService.updateCart(product, qty);
    this.updateCartCount();
    if (qty > 0) {
      this.toastrService.info('Added 1 ' + product.product_name);
    } else {
      this.toastrService.error('Removed 1 ' + product.product_name);
    }
  }

  updateCartCount(): void {
    const x = this.cartService.getCart();
    this.cartCountEmitter.emit(x.count);
  }

  reloadData() {
    if (this.category !== null) {
      const dbproducts = this.productsService.getProductStockList().subscribe(data => {
        this.filteredProducts = this.filterService.filterAndSort(data, this.category, this.sortKey);
        console.log(this.filteredProducts);
      });
    } else {
      this.products = this.productsService.getProductStockList();
    }
  }

  deleteProductStock(id: number) {
    this.productsService.deleteProductStock(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  getProductStockDetails(id: number) {
    this.router.navigate(['Product Stock Details', id]);
  }

}
