import { Product } from './../../../shared/models/product';
import { Subscription } from 'rxjs/Subscription';
import { ProductService } from './../../../shared/services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
	products: Product[];
  filtered: any[];
	subscription: Subscription;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private productService: ProductService) {}

  /*
  private initializeTable(products: Product[]) {
  	this.tableResource = new DataTableResource(products);
  	this.tableResource.query({ offset: 0})
  	  .then(items => this.items = items);
  	this.tableResource.count()
  	  .then(count => this.itemCount = count);
  }

  reloadItems(params) {
  	if (!this.tableResource) return;

  	this.tableResource.query(params)
  	  .then(items => this.items = items);
  }
  */

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      searching: false,
      //ordering: false,  // this turns off ordering in the whole table
      columns: [
        { "data": "title",
          "title": "Title"
        },
        { "data": "price",
          "title": "Price"
        },
        { "data": "edit",
          "title": "",
          "orderable": false // this turns off ordering in this specific column only
        }
      ]
    };

    this.subscription = this.productService.getAll()
      .subscribe(products => {
        this.filtered = this.products = products;
        this.dtTrigger.next();
      });
  }

  ngOnDestroy() {
  	this.subscription.unsubscribe();
  }

  // client-side filtering
  filter(query: string) {
    //console.log(query);
    this.filtered = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

}
