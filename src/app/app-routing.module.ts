import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { DetailComponent } from './components/product/detail/detail.component';
import { FormComponent } from './components/product/form/form.component';
import { ListComponent } from './components/product/list/list.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';

const routes: Routes = [
  {
    path: "", component: HomeComponent
  },
  {
    path: "about", component: AboutComponent
  },
  {
    path: "products",
    children: [
      {path: "", component: ListComponent},
      {path: "create", component: FormComponent},
      {path: "details", component: DetailComponent},
    ]
  },
  {
    path: "users",
    children: [
      {path: "", component: UserListComponent},
      {path: "edit", component: UserEditComponent}
    ]
  },
  {
    path: "login", component: UserLoginComponent
  },
  {
    //must be the last one or you won't access others
    path: "**", component :ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
