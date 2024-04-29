import { Component } from '@angular/core';
import { UserInfoService } from './shared/services/user-info.service';
import { User } from './user-details/login-page/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'libraryManagement';

  constructor(private authService: UserInfoService) {

  }

  ngOnInit() {
    this.authService.autologout();
  }
}
