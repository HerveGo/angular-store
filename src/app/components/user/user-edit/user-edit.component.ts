import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  formGroup!: FormGroup;
  mode: "add" | "update" = "add";

  constructor(
    private route:ActivatedRoute,
    private location: Location,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    let email = this.route.snapshot.queryParamMap.get("email");
    if (email) this.mode = "update";

    this.formGroup = this.fb.group({
      email: [{value:"admin@example.com", disabled: this.mode=="update"}, [
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

  /**
   * Ajout ou modification, selon le mode
   */
  submit(): void {
    switch (this.mode) {
    case "add":
      this.addUser();
      break;
    case "update":
      this.updateUser();
      break;
    }
  }

  addUser(): void {

  }

  updateUser(): void {

  }

  cancel(): void {
    this.location.back();
  }

}
