import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductModel } from 'src/app/models/product.model';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { ProductService } from 'src/app/services/product.service';
import { DeleteProductComponent } from '../../dialogs/delete-product/delete-product.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  products: ProductModel[] = [];

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    public authService: AuthUserService,
    ) { }

  ngOnInit(): void {
    this.refresh();
  }
  
  refresh(): void {
    this.productService.getAll().subscribe((products) => this.products = products);
  }

  showProduct(product: ProductModel): void {
    console.log(product);
    
  }

  updateProduct(product: ProductModel): void {

  }

  deleteProduct(product: ProductModel): void {
    const dialogRef = this.dialog.open(DeleteProductComponent, {width: "300px", data: product});
      dialogRef.afterClosed().subscribe(result => {
        console.log("Dialog closed " + result);
        if (result) {
          console.log("suppressing");
          this.productService.deleteProduct(product.id!).subscribe( () => this.refresh() );
        }
        //this.refresh(); /!\ not here, but in the subscribe
      })
  }

}
