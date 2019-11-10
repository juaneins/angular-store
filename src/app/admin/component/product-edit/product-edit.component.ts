import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { MyValidators } from 'src/app/utils/validators';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  formulario: FormGroup;
  id: string;
  image$: Observable<any>;

  constructor(private formBuilder: FormBuilder, private productsService: ProductsService,
    private router: Router, private activatedRoute: ActivatedRoute,
    private storage : AngularFireStorage) {
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

  uploadFile(event) {
    const file = event.target.files[0];
    console.log(file);
    const name = file.name;
    const fileRef = this.storage.ref(name);
    const task = this.storage.upload(name, file);

    task.snapshotChanges().pipe(
      finalize(() => {
        this.image$ = fileRef.getDownloadURL();
        this.image$.subscribe(url => {
          console.log(url);
          this.formulario.get('image').setValue(url);
        })
      })
    )
      .subscribe();
  }
}
