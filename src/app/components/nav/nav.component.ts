import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

import { AuthService } from 'src/app/services/auth.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  token = '';
  profile: User | null = null;

  constructor(
    private authService: AuthService,
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    this.authService.login('brandon@mail.com','12345')
    .subscribe(data => {
      this.token = data.access_token;
      this.getProfile();
    });
  }

  getProfile() {
    this.authService.profile(this.token)
    .subscribe(data => {
      this.profile = data;
    })
  }
}
