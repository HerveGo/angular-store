import { AbstractControl, ValidationErrors } from '@angular/forms';

class PasswordValidator {
    static mustMatch(control: AbstractControl): ValidationErrors | null {
        if (control) {
            const sourceControl = control.get("password");
            const matchingControl = control.get("confirmPassword");

            if (matchingControl?.errors && !matchingControl.errors['mustMatch']) {
                // return if another validator has already found an error on the matchingControl
                return null;
            }

            // set error on matchingControl if validation fails
            if (sourceControl?.value !== matchingControl?.value) {
                matchingControl?.setErrors({ mustMatch: true });
            } else {
                matchingControl?.setErrors(null);
            }
        }

        return null;
    }
}

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string): (control: AbstractControl) => null {
    return (control: AbstractControl) => {
        if (control) {
            const sourceControl = control.get(controlName);
            const matchingControl = control.get(matchingControlName);

            if (matchingControl?.errors && !matchingControl.errors['mustMatch']) {
                // return if another validator has already found an error on the matchingControl
                return null;
            }

            // set error on matchingControl if validation fails
            if (sourceControl?.value !== matchingControl?.value) {
                matchingControl?.setErrors({ mustMatch: true });
            } else {
                matchingControl?.setErrors(null);
            }

        }
        return null;
    }
}
