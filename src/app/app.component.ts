import { Component } from '@angular/core';

import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  imgLoaded = '';
  showImg = true;

  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {

  }

  createUser() {
    this.usersService.create({
      name: 'Brandon',
      email: 'brandon@mail.com',
      password: '12345'
    })
    .subscribe(data => {
      console.log(data);
      
    });
  }

  login() {
    this.authService.login('brandon@mail.com','12345')
    .subscribe(data => {
      console.log(data.access_token);
    });
  }

  /**
   * The function takes a string as an argument and sets the imgLoaded property to the value of the
   * string
   * @param {string} img - string - The image that was loaded.
   */
  // onImgLoaded(img: string) {
  //   this.imgLoaded = img;
  // }

  // toggleImg() {
  //   this.showImg = !this.showImg;
  // }
}
