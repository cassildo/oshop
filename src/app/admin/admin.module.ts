import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { RouterModule } from '@angular/router';

// Components
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';

// Services
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { AuthGuard } from './../shared/services/auth-guard.service';

@NgModule({
  imports: [
    SharedModule,
    DataTablesModule,
    RouterModule.forChild([
      { 
        path: 'admin/products/new', 
        component: ProductFormComponent, 
        canActivate: [AuthGuard, AdminAuthGuard] 
      },{ 
        path: 'admin/products/:id', 
        component: ProductFormComponent, 
        canActivate: [AuthGuard, AdminAuthGuard] 
      },
      { 
        path: 'admin/products', 
        component: AdminProductsComponent, 
        canActivate: [AuthGuard, AdminAuthGuard] 
      },
    	{ 
    	  path: 'admin/orders', 
    	  component: AdminOrdersComponent, 
    	  canActivate: [AuthGuard, AdminAuthGuard]
    	}
    ])
  ],
  declarations: [
  	ProductFormComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
  ],
  providers: [
  	 AdminAuthGuard,
  ]
})
export class AdminModule { }
