import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-searched-store',
  templateUrl: './searched-store.component.html',
  styleUrls: ['./searched-store.component.css']
})
export class SearchedStoreComponent implements OnInit {
  @Input('stores') stores: any;
  constructor() { }
  maxRating = [0, 1, 2, 3, 4, 5];

  ngOnInit(): void {
  }

}
