import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { MustMatch } from 'src/app/validators/password.validator';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  formGroup!: FormGroup;
  mode: "add" | "update" = "add";
  submitted: boolean = false;

  validationMessages = {
    "name": [
      { type: "required", message: "Le nom est obligatoire." },
      { type: 'minlength', message: "Au moins 2 caractères." }
    ],
    "email": [
      { type: "required", message: "L'adresse e-mail est obligatoire." },
      { type: 'email', message: "Entrez une adresse valide." }
    ],
    "password": [
      { type: "required", message: "Le mot de passe est obligatoire." },
      { type: "minlength", message: "Au moins 4 caractères." },
    ],
    "confirmPassword": [
      { type: "required", message: "La confirmation est obligatoire." },
      { type: "minlength", message: "Au moins 4 caractères." },
      { type: "mustMatch", message: "Confirmation incorrecte !" },
    ]
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private fb: FormBuilder,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    let email = this.route.snapshot.queryParamMap.get("email");
    let username = this.route.snapshot.queryParamMap.get("name");
    console.log(username);
    
    if (email) this.mode = "update";

    this.formGroup = this.fb.group({
      username: [{value: (this.mode=="update") ? username : "", disabled: false}, [Validators.required, Validators.minLength(2)]],
      email: [{value: (this.mode=="update") ? email : "", disabled: this.mode=="update"},
        [Validators.required, Validators.email]
      ],
      password: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      confirmPassword: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(64)]]
    }, {validators: MustMatch("password", "confirmPassword")});
  }

  /**
   * Ajout ou modification, selon le mode
   */
  onSubmit(): void {
    switch (this.mode) {
    case "add":
      this.addUser();
      break;
    case "update":
      this.updateUser();
      break;
    }

  }

  /**
   * Ajoute un nouvel utilisateur. Retourne à la liste une fois créé.
   */
  addUser(): void {
    const newUser: UserModel = {
      name: this.formGroup.controls["username"].value,
      email: this.formGroup.controls["email"].value,
      role: 7,
      date_created: new Date(),
      date_updated: new Date()
    };
    this.userService.createUser(newUser).subscribe( () => this.router.navigateByUrl("/users") );
  }

  updateUser(): void {
    this.addUser();
  }

  cancel(): void {
    this.location.back();
  }

}
