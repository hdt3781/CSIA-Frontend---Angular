// Imports relevant components and functions from external Angular services.
import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {debounceTime, switchMap} from 'rxjs/operators';
import {ProductsService} from '../../../services/products/products.service';
@Component({
  selector: 'app-search-store',
  templateUrl: './search-store.component.html',
  styleUrls: ['./search-store.component.css']
})
export class SearchStoreComponent implements OnInit {
  // Initialization of stores and products variables
  stores: any;
  products: any;
  searchCtrlProducts = new FormControl();
  // Sets variables 'productsUrl' and 'storesURL' as the REST API URLS, remember to change the address if
  // the backend port is changed.
  productsUrl = 'http://localhost:3000/store_products_byAutocomplete/?product_name=';
  storesUrl = 'http://localhost:3000/stores_byAutocomplete?store_name=';
  // toggleChildElement is intitially set to false.
  toggleChildElement: boolean = false;
  constructor(private http: HttpClient, private productsService: ProductsService) {}
  ngOnInit() {
    // For every change in value in the search field inputted by the user, the following chain of events
    // take place if a product is recognized.
    this.searchCtrlProducts.valueChanges
      .pipe (
        // Delay for 500 milliseconds
        debounceTime (500),
        // For every change in the input value, use the get function defined in the backend service to
        // retireve the data from the database using the HTTP url defined above with this new change.
        switchMap (value => this.http.get(this.productsUrl + value))
      )
      // As data is received from the backend, add these values to the products variable defined above.
      // If data is recieved, toggleChildElement is set to true, this is used to display products
      // in the html template.
      .subscribe (data => {
        this.products = data as any;
        this.toggleChildElement = true;
      });
    // Deliberately, using the same product variable value changes to trigger the following chain of events.
    this.searchCtrlProducts.valueChanges
      .pipe (
        // Delay for 500 milliseconds
        debounceTime (500),
        // For every change in the input value, use the get function defined in the backend service to
        // retireve the data from the database using the HTTP url defined above with this new change.
        switchMap (value => this.http.get(this.storesUrl + value))
      )
      // As data is received from the backend, add these values to the stores variable defined above.
      // If data is recieved, toggleChildElement is set to true, this is used to display stores
      // in the html template.
      .subscribe (data => {
        this.stores = data as any;
        this.toggleChildElement = true;
      });
  }
}



