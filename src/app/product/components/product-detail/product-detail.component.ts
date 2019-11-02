import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductsService } from '../../../core/services/products/products.service';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

product: Product;

  constructor(private route: ActivatedRoute, private productsService: ProductsService) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      this.fetchProduct(id);
      // this.product = this.productsService.getProduct(id);
      // console.log(this.product);
    });
  }

  fetchProduct(id: string) {
    return this.productsService.getProduct(id)
    .subscribe(product => {
      this.product = product;
      console.log('En fetch product: ' + this.product);
    });
  }
}
