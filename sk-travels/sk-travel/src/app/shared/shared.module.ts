import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { TopbarComponent } from './topbar/topbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { UserFooterComponent } from './user-footer/user-footer.component';

@NgModule({
  declarations: [
    TopbarComponent,
    SidebarComponent,
    UserHeaderComponent,
    UserFooterComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [
    TopbarComponent,
    SidebarComponent,
    UserHeaderComponent,
    UserFooterComponent,
  ],
  providers: [TitleCasePipe]
})
export class SharedModule { }
