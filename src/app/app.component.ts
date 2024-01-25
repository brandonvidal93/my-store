import { Component, OnInit } from '@angular/core';

import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  imgParent = '';
  imgLoaded = '';
  showImg = true;
  token = '';
  imgRta = '';

  constructor(
    private usersService: UsersService,
    private filesService: FilesService,
    private authService: AuthService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    const token = this.tokenService.getToken();

    if(token) {
      this.authService.profile()
      .subscribe();
    }
  }

  createUser() {
    this.usersService.create({
      name: 'Brandon',
      email: 'brandon@mail.com',
      password: '12345',
      role: 'customer'
    })
    .subscribe(data => {
      console.log(data);
    });
  }

  /**
   * The function `downloadPdf()` downloads a PDF file from a specified URL using the `getFile()`
   * method from the `filesService` and subscribes to the resulting observable.
   */
  downloadPdf() {
    this.filesService.getFile('my.pdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf')
    .subscribe()
  }

  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);

    if(file) {
      this.filesService.uploadFile(file)
      .subscribe(response => {
        this.imgRta = response.location;
      })
    }
  }
}
