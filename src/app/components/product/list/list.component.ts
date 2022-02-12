import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  products: ProductModel[] = [];

  constructor(
    private productService: ProductService,
    public authService: AuthUserService) { }

  ngOnInit(): void {
    this.productService.getAll().subscribe((products) => this.products = products);
  }

  showProduct(): void {

  }

  updateProduct() {

  }

  deleteProduct() {
    
  }

}
