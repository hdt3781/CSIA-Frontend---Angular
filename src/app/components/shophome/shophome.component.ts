import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shophome',
  templateUrl: './shophome.component.html',
  styleUrls: ['./shophome.component.scss']
})
export class ShophomeComponent implements OnInit {

  cartCount = 0 ;
  category = null;
  sortKey = null;
  cards = [
    {
      title: 'Dairy',
      description: 'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
      buttonText: 'Shop',
      img: './assets/img/dairy.png'
    },
    {
      title: 'Fruits and Vegetables',
      description: 'This card has supporting text below as a natural lead-in to additional content.',
      buttonText: 'Shop',
      img: './assets/img/veg.png'
    },
    {
      title: 'Meat, Seafood, and Poultry',
      description: 'This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action. This text is much longer so that you can see a significant difference between the text in  previous tabs.',
      buttonText: 'Shop',
      img: './assets/img/meat.png'
    },
    {
      title: 'Dry and Canned Foods',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Shop',
      img: './assets/img/dryfood.png'
    },
    {
      title: 'Beverages',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Shop',
      img: './assets/img/beverage.png'
    },
    {
      title: 'Bakery',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Shop',
      img: './assets/img/bread.png',
      category: 'Bak'
    }
  ];
  slides: any = [[]];
  chunk(arr: any, chunkSize:any) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }
  ngOnInit() {
    this.slides = this.chunk(this.cards, 3);
    this.sortKey = 'price';
  }
  setCategory(val){
    this.category = val;
  }
  setSortKey(val){
    this.sortKey = val;
  }
  updateCartCount(event): void {
    this.cartCount = event;
  }
}

