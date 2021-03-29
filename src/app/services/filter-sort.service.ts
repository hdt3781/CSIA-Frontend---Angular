import {Injectable} from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class FilterSortService {
  localSearch = null;
  constructor() {
  }

  // Create function GetSortorder with parameter prop.
  GetSortOrder(prop) {
    // Creates two objects, a and b.
    return (a, b) => {
      if (a[prop] > b[prop]) {
        return 1;
      } else if (a[prop] < b[prop]) {
        return -1;
      }
      return 0;
    };
  }

  // Create function checkCategory
  checkCategory(product) {
    // Create a variable re to which the input value (by user) is assigned
    const re = new RegExp(this.localSearch.toLocaleUpperCase().trim(), 'g');
    // Setting the value of retFlag to false
    let retFlag = false;
    // If the localSearch (input value by user) is defined and
    // if the value or 're' matches the category of a given product
    // set retFlag to true.
    if (typeof this.localSearch !== 'undefined') {
      if (product.category.toLocaleUpperCase().trim().match(re)) {
        retFlag = true;
      }
      return retFlag;
    }
  }

// Create function filterAndSort
  filterAndSort(inpProducts, fc, sk) {
    // Set the value of localSearch to the fc (filter criteria - user's chosen category).
    this.localSearch = fc;
    let filteredObjects;
    // The filtered inpProducts (array of all products) is assigned to filteredObjects.
    // The filter function is performed on each element of the products array.
    filteredObjects = inpProducts.filter(el => {
      // Create a variable re to which the input value (by user) is assigned
      const re = new RegExp(this.localSearch.toLocaleUpperCase().trim(), 'g');
      // Setting the value of retFlag to false
      let retFlag = false;
      // If the localSearch (input value by user) is defined and
      // if the value or 're' matches the category of a given product
      // set retFlag to true.
      if (typeof this.localSearch !== 'undefined') {
        if (el.category.toLocaleUpperCase().trim().match(re)) {
          retFlag = true;
        }
        return retFlag;
      }
    });
    // Sort through the filteredObjects array, performing the GetSortOrder function to sort the array.
    filteredObjects.sort(this.GetSortOrder(sk));
    return (filteredObjects);
  }
}

