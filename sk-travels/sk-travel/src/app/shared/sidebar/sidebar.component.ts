import { Component, OnInit } from '@angular/core'; 

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

 modules:any = {
    dashboard:true,
    addRoles:true,
    users:true,
    location:true,
    flightInfoDetails:true,
    flightMapping:true
  }


  constructor() { }

  ngOnInit(): void {
  }

}
