import { Product } from './../../../shared/models/product';
import { Subscription } from 'rxjs/Subscription';
import { ProductService } from './../../../shared/services/product.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
	//products: Product[];
  //filtered: any[];
  //dtOptions: DataTables.Settings = {};
  //dtTrigger: Subject<any> = new Subject();

  subscription: Subscription;

  displayedColumns = ['title', 'price', 'edit'];
  dataSource =  new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

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
    /*
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
    */

    this.subscription = this.productService.getAll()
      .subscribe(products => {
        /*
        this.filtered = this.products = products;
        this.dtTrigger.next();
        */
        this.dataSource.data = products;
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
 
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  /*
  // client-side filtering
  filter(query: string) {
    //console.log(query);
    this.filtered = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }
  */

  ngOnDestroy() {
  	this.subscription.unsubscribe();
  }
}
