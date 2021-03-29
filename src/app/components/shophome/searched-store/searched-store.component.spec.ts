import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchedStoreComponent } from './searched-store.component';

describe('SearchedStoreComponent', () => {
  let component: SearchedStoreComponent;
  let fixture: ComponentFixture<SearchedStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchedStoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchedStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
