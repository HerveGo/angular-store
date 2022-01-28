import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  formGroup!: FormGroup; 

  constructor(
    private fb: FormBuilder,
    private location: Location) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      email: ["", [
          Validators.required,
          Validators.email
        ]
      ],
      password: ["", [
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
    
  }

  onCancel(): void {
    this.location.back();
  }

}
