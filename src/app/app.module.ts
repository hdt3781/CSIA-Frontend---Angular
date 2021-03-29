import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { MDBSpinningPreloader } from 'ng-uikit-pro-standard';
import { ToastModule } from 'ng-uikit-pro-standard';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { MainComponent } from './components/main/main.component';
import { AsideComponent } from './components/aside/aside.component';
import { FooterComponent } from './components/footer/footer.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductsComponent } from './components/products/products.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ShophomeComponent } from './components/shophome/shophome.component';
import { SearchStoreComponent } from './components/search/search-store/search-store.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
// import { MatTableFilterModule } from 'mat-table-filter';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatListModule} from '@angular/material/list';
import { MatIconModule} from '@angular/material/icon';
import { MatProgressBarModule} from '@angular/material/progress-bar';
import { MatCardModule} from '@angular/material/card';
import { SearchProductComponent } from './components/search/search-product/search-product.component';
import { SearchedStoreComponent } from './components/shophome/searched-store/searched-store.component';
import { SearchedProductComponent } from './components/shophome/searched-product/searched-product.component';
import { CartComponent } from './cart/cart.component';
import { ShopHeaderComponent } from './shop-header/shop-header.component';
import { ContactusComponent } from './components/contactus/contactus.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    MainComponent,
    AsideComponent,
    FooterComponent,
    PrivacyPolicyComponent,
    ProductsComponent,
    HomeComponent,
    AboutComponent,
    ShophomeComponent,
    SearchStoreComponent,
    SearchProductComponent,
    SearchedStoreComponent,
    SearchedProductComponent,
    CartComponent,
    ShopHeaderComponent,
    ContactusComponent,
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModulesPro.forRoot(),
    ToastModule.forRoot({maxOpened: 5}),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    // MatTableFilterModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatListModule,
    MatIconModule,
    MatProgressBarModule,
    MatCardModule,
    MatAutocompleteModule,
    MatInputModule,
    AppRoutingModule

  ],
  providers: [ MDBSpinningPreloader ],
  bootstrap: [AppComponent]
})

export class AppModule { }
