import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  maxRating = [0, 1, 2, 3, 4, 5];
  constructor() { }

  ngOnInit() {
  }

}
