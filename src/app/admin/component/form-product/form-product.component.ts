import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {

  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder, private productsService: ProductsService,
    private router: Router) { 
    this.buildForm();
  }

  ngOnInit() {
  }

  private buildForm() {
    this.formulario = this.formBuilder.group({
      id: ['', [Validators.required]],
      title: ['',[Validators.required]],
      price: ['', [Validators.required]],
      image: '',
      description: ['',[Validators.required]]
    });
  }

  saveProduct(event: Event) {
    event.preventDefault();
    if (this.formulario.valid) {
      this.productsService.createProduct(this.formulario.value).subscribe(
        newProduct => {
          console.log("Nuevo producto" + newProduct);
          this.router.navigate(['./admin/products']);
        }
      );
    }
   
  }

}
