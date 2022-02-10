import { Component, OnInit } from '@angular/core';
import { MatRow } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

const route = "/users/edit";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  selectedRow: UserModel | null = null;
  users: UserModel[] = [];
  
  columnsToDisplay = ['name', 'email', 'date_created', 'date_updated'];
  expandedElement: UserModel | null = null;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getAll()
      .subscribe((users: UserModel[]) => this.users = users)
  }

  /**
   * Sélectionne / déselectionne une ligne
   * @param row le UserModel renvoyé par le clic
   */
  toggleSelectRow(row: UserModel): void {
    if (this.selectedRow == null) {
      this.selectedRow = row;
    } else {
      this.selectedRow = null;
    }
  }

  addUser(): void {
    this.router.navigate([route]);
  }

  editUser(): void {
    if (this.selectedRow) {
      this.router.navigate([route], {queryParams: {email: this.selectedRow?.email}});
    }
  }
}
