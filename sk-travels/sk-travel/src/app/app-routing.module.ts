import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { UserGuard } from './user.guard';

const routes: Routes = [
  { path: '', redirectTo: '/user', pathMatch:'full' },
  { path: '', loadChildren: () => import("./auth/auth-routing.module").then(c => c.AuthRoutingModule) },
  { path: 'admin',canActivate:[AdminGuard], loadChildren: () => import("./admin/admin.module").then(c => c.AdminModule) },
  { path: 'user',canActivate:[UserGuard], loadChildren: () => import("./user/user.module").then(c => c.UserModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
