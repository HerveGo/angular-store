import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { MatDialog} from '@angular/material/dialog';
import { DeleteUserComponent } from '../../dialogs/delete-user/delete-user.component';

const route = "/users/edit";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  selectedRow: UserModel | null = null;
  //users: UserModel[] = [];
  dataSource = new MatTableDataSource<UserModel>([]);
  
  columnsToDisplay = ['name', 'email', 'date_created', 'date_updated'];
  expandedElement: UserModel | null = null;

  constructor(
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.refresh();
  }

  /**
   * Récupère les informations sur les utilisateurs, et les lie à la datasource de la table
   */
  refresh() {
    this.selectedRow = null;
    this.userService.getAll()
      .subscribe((users: UserModel[]) => {
        this.dataSource.data = users;
      })
  }

  /**
   * Sélectionne / déselectionne une ligne
   * @param row le UserModel renvoyé par le clic
   */
  toggleSelectRow(row: UserModel): void {
    
      this.selectedRow = (this.selectedRow === row) ? null : row;
    
  }

  addUser(): void {
    this.router.navigate([route]);
  }

  editUser(): void {
    if (this.selectedRow) {
      this.router.navigate([route], {queryParams: {email: this.selectedRow?.email, name: this.selectedRow?.name}});
    }
  }

  deleteDialog(): void {
    if (this.selectedRow) {
      const dialogRef = this.dialog.open(DeleteUserComponent, {width: "300px", data: this.selectedRow});
      dialogRef.afterClosed().subscribe(result => {
        console.log("Dialog closed " + result);
        if (result == true) {
          console.log("suppressing");
          
          this.userService.deleteUser(this.selectedRow!.email).subscribe( () => this.refresh() );
        }
        //this.refresh(); /!\ not here, but in the subscribe
      })
    }
  }
}
