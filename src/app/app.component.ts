import { Component } from '@angular/core';

import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  imgLoaded = '';
  showImg = true;
  token = '';

  constructor(
    private usersService: UsersService,
    private filesService: FilesService
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

  downloadPdf() {
    this.filesService.getFile('my.pdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf')
    .subscribe()
  }
}
