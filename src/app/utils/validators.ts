import { AbstractControl } from '@angular/forms';

export class MyValidators {

    static isPriceValid(control: AbstractControl) {
        const value = control.value;
        console.log(value);
        if (value > 10000) {
            console.log('Ingresa a if');
            return {price_invalid: true};
        }
        return null;
    }
}