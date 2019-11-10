import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { Router } from '@angular/router';
import { MyValidators } from 'src/app/utils/validators';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {

  formulario: FormGroup;
  image$: Observable<any>;

  constructor(private formBuilder: FormBuilder, private productsService: ProductsService,
    private router: Router, private storage: AngularFireStorage) { 
    this.buildForm();
  }

  get priceField() {
    return this.formulario.get('price');
  }

  ngOnInit() {
  }

  private buildForm() {
    this.formulario = this.formBuilder.group({
      id: ['', [Validators.required]],
      title: ['',[Validators.required]],
      price: ['', [Validators.required, MyValidators.isPriceValid]],
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
