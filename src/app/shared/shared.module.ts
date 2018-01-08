import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { DataTableModule } from 'angular-4-data-table-bootstrap-4';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

// Components
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';

// Services
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { UserService } from './services/user.service';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { OrderService } from './services/order.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
  ],
  declarations: [
  	  ProductCardComponent,
      ProductQuantityComponent,
  ],
  exports: [
  	  ProductCardComponent,
      ProductQuantityComponent,
      CommonModule,
      FormsModule,
      CustomFormsModule,
      DataTableModule,
      AngularFireDatabaseModule,
      AngularFireAuthModule,
      NgbModule.forRoot().ngModule,
  ],
  providers: [
  	  AuthService,
  	  AuthGuard,
  	  UserService,
      CategoryService,
      ProductService,
      ShoppingCartService,
      OrderService
  ]
})
export class SharedModule { }