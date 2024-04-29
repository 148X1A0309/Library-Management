import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../shared/services/user-info.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  name: any;
  authData: any;
  constructor(private userInfo: UserInfoService, private modalService: NgbModal) { }

  ngOnInit() {
  }

  searchName() {
    if (this.name) {
      this.userInfo.checkUser(this.name).subscribe(res => {
        console.log(res);
      })
    }
  }
  logout(event:Event) {
  //  event.preventDefault();
    this.userInfo.logout(); 
  }

}