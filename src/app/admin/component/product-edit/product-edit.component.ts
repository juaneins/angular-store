import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { MyValidators } from 'src/app/utils/validators';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  formulario: FormGroup;
  id: string;

  constructor(private formBuilder: FormBuilder, private productsService: ProductsService,
    private router: Router, private activatedRoute: ActivatedRoute) {
    this.buildForm();
  }

  get priceField() {
    return this.formulario.get('price');
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
      console.log('Id ruta: ' + this.id);
      this.productsService.getProduct(this.id).subscribe(product => {
        this.formulario.patchValue(product);
      });
    });
  }

  private buildForm() {
    this.formulario = this.formBuilder.group({
      id: ['', [Validators.required]],
      title: ['', [Validators.required]],
      price: ['', [Validators.required, MyValidators.isPriceValid]],
      image: '',
      description: ['', [Validators.required]]
    });
  }

  saveProduct(event: Event) {
    event.preventDefault();
    if (this.formulario.valid) {
      const product = this.formulario.value;
      this.productsService.updateProduct(this.id, product).subscribe(
        newProduct => {
          console.log("Nuevo producto" + newProduct);
          this.router.navigate(['./admin/products']);
        }
      );
    }

  }
}
