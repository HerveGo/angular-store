import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthUserService } from 'src/app/services/auth-user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  formGroup!: FormGroup; 

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private authUserService: AuthUserService) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      email: ["admin@example.com", [
          Validators.required,
          Validators.email
        ]
      ],
      password: ["0000", [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(10)
        ]
      ]
    });
  }

  onSubmit(): void {
    if( this.formGroup.invalid ) return;
    console.log(this.formGroup.value);
    const email = this.formGroup.get("email")?.value;
    const password = this.formGroup.get("password")?.value;
    this.authUserService.login(email, password)
      .subscribe(user => console.log(user)
      );
  }

  onCancel(): void {
    this.location.back();
  }

}
