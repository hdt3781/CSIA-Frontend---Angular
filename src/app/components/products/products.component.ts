import {Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs';
import {Products} from '../../interfaces/products';
import {Router} from '@angular/router';
import {ProductsService} from '../../services/products/products.service';
import {FilterSortService} from '../../services/filter-sort.service';
import {CartService} from '../../cart.service';
import { ToastService } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnChanges {
  @Input() category;
  @Input() sortKey;
  @Output() cartCountEmitter = new EventEmitter<any>() ;

  products: Observable<Products[]>;
  maxRating = [0, 1, 2, 3, 4, 5];
  filteredProducts: any;

  constructor(private productsService: ProductsService,
              private filterService: FilterSortService,
              private cartService: CartService,
              private router: Router,
              private toastrService: ToastService) {}

  ngOnInit() {
    this.reloadData();

   // this.products = this.productsService.getProductStockList();
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
    // this.changeLog.push(log.join(', '));
    this.reloadData();
  }

  updateCart(product, qty) {
    this.cartService.updateCart(product, qty);
    this.updateCartCount();
    if (qty > 0 ) {
      this.toastrService.info('Added 1 ' + product.product_name);
    }
    else {
      this.toastrService.error('Removed 1 ' + product.product_name );
    }
  }
  updateCartCount(): void {
    const x = this.cartService.getCart();
    this.cartCountEmitter.emit(x.count);
  }

  // Create operation reloadData
  reloadData() {
    // If the category is defined.
    if (typeof this.category !== 'undefined') {
      // Use the getProductStockList defined in the productService to subscribe to the data.
      const dbproducts = this.productsService.getProductStockList().subscribe( data => {
        // If data is received and category is defined.
        // Set value to ''
        if ( typeof data !== 'undefined') {
          if ( typeof this.category === 'undefined' ) {
            this.category = '';
          }
          // If the sortKey is defined
          // Set value to 'price'.
          if ( typeof this.sortKey === 'undefined' ) {
            this.sortKey = 'price';
          }
          // Set filteredProducts value as the output of the filterAndSort service defined in filterSerivce
          // using the input category and input sorting key as the parameters.
          this.filteredProducts = this.filterService.filterAndSort(data, this.category, this.sortKey);
        }
      });
    }
    // Otherwise, the value of filteredProducts is set to the products array
    else {
      this.products = this.productsService.getProductStockList();
      this.productsService.getProductStockList().subscribe( data => {
        this.filteredProducts = data ;
      });
    }
  }

  deleteProductStock(id: number) {
    this.productsService.deleteProductStock(id)
      .subscribe(
        data => {
          this.reloadData();
        },
        error => console.log(error));
  }

  getProductStockDetails(id: number){
    this.router.navigate(['Product Stock Details', id]);
  }
}
