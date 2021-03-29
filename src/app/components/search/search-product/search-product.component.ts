import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ProductsService} from '../../../services/products/products.service';
import {debounceTime, finalize, switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Products} from '../../../interfaces/products';
import {FilterSortService} from '../../../services/filter-sort.service';
import {CartService} from '../../../cart.service';
import {Router} from '@angular/router';
import {ToastService} from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit, OnChanges {
  searchCtrlStores = new FormControl();
  filteredStores: any;
  isLoading = false;
  errorMsgStores: string;
  displayFnStores: any;
  @Input() category;
  @Input() sortKey;
  @Output() cartCountEmitter = new EventEmitter<any>();
  products: Observable<Products[]>;
  maxRating = [0, 1, 2, 3, 4, 5];
  url = 'http://localhost:3000/store_products_byAutocomplete/?product_name=';
  filteredProducts: any;

  constructor(private productsService: ProductsService,
              private filterService: FilterSortService,
              private cartService: CartService,
              private router: Router,
              private toastrService: ToastService,
              private http: HttpClient) {
  }

  ngOnInit() {
    this.searchCtrlStores.valueChanges
      .pipe(debounceTime(500), tap(() => {
          this.errorMsgStores = '';
          this.filteredStores = [];
          this.isLoading = true;
        }),
        switchMap(value => this.http.get(this.url + value)
          .pipe(finalize(() => {
              this.isLoading = false;
            }),
          )
        )
      )
      .subscribe(data => {
        this.filteredStores = data;
        console.log('Filtered : ' + this.filteredStores);
        console.log('Data' + JSON.stringify(data));
        console.log('Filtered : ' + this.filteredStores);
        localStorage.setItem('Store Name for Store Maintain', JSON.stringify(this.searchCtrlStores.value));
      });
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
      this.toastrService.info('Added ' + qty + ' ' + product.product_name);
    } else {
      this.toastrService.error('Removed ' + qty * -1 + ' ' + product.product_name);
    }
  }

  updateCartCount(): void {
    const x = this.cartService.getCart();
    this.cartCountEmitter.emit(x.count);
  }

  reloadData() {
    if (this.category !== null) {
      const dbproducts = this.productsService.getProductStockList().subscribe(data => {
        if (typeof data !== undefined) {
          if (this.category === undefined) {
            this.category = '';
          }
          if (this.sortKey === undefined) {
            this.sortKey = 'price';
          }
          this.filteredProducts = this.filterService.filterAndSort(data, this.category, this.sortKey);
          console.log(this.filteredProducts);
        } else {
          console.log('No Products Returned ');
        }
      });
    } else {
      this.products = this.productsService.getProductStockList();
    }
  }

  deleteProductStock(id: number) {
    this.productsService.deleteProductStock(id)
      .subscribe(data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  getProductStockDetails(id: number) {
    this.router.navigate(['Product Stock Details', id]);
  }
}
