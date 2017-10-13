import { Directive, forwardRef } from '@angular/core';
import { Validator, FormControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: '[nonCyrillic]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => NonCyrillicDirective), multi: true }
    ]
})
export class NonCyrillicDirective implements Validator {
    constructor() { }

    validate(control: FormControl): ValidationErrors | null {
        let error = {
            nonCyrillic: {
                valid: false
            },
            message: 'Требуется не менее 6 символов и не разрешено вводить кириллицу'
        };

        let pattern = /^[^\u0400-\u04FF]{6,}$/;

        return pattern.test(control.value) ? null : error;
    }
}