import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  formGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group(
      {
        title: ['test'],
        description: ['hello'],
        published: [true]
      }
    )
  }

  onSubmit(): void {
    console.log(this.formGroup.value);
  }

  onCancel(): void {
    this.location.back();
  }

}
