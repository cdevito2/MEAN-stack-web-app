import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';

import { AuthViewComponent } from './auth-view/auth-view.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import {RegisterComponent} from './register/register.component';
import { PoliciesComponent } from './policies/policies.component';

const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"policies",component:PoliciesComponent},
  {path:"auth-view",component:AuthViewComponent},
  {path: "admin-view",component:AdminViewComponent},
  {path: "register",component:RegisterComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
