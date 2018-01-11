import { Component, OnInit } from '@angular/core';
import { OrderService } from './../../services/order.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  order = <any>{};
  id;
  priceTotal = 0;

  constructor(
  	private route: ActivatedRoute,
  	private orderService: OrderService
  	) { }

  ngOnInit() {
  	this.id = this.route.snapshot.paramMap.get('id');
  	
  	if (this.id) this.orderService.get(this.id).take(1).subscribe(o => {
  		this.order = o;
  		for (let i = 0; i < this.order.items.length; i++) {
  			this.priceTotal += this.order.items[i].totalPrice;
  		};
  	});
  }

}
