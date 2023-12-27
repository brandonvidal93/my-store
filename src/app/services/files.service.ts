import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { tap, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

interface File {
  originalname: string,
  filename: string,
  location: string
}

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  private apiUrl = `${environment.API_URL}/api/files`;

  constructor(
    private http: HttpClient
  ) { }

  /**
   * The function `getFile` downloads a file from a given URL and saves it with a specified name and
   * type.
   * @param {string} name - The name of the file that will be saved.
   * @param {string} url - The `url` parameter is the URL of the file that you want to download.
   * @param {string} type - The "type" parameter is the MIME type of the file. It specifies the type of
   * data that is contained in the file. Examples of MIME types include "text/plain" for plain text
   * files, "image/jpeg" for JPEG image files, and "application/pdf" for PDF files.
   * @returns an Observable<boolean>.
   */
  getFile(name: string, url: string, type: string) {
    return this.http.get(url, {responseType: 'blob'})
    .pipe(
      tap(content => {
        const blob= new Blob([content], {type});
        saveAs(blob, name);
      }),
      map(() => true)
    );
  }

  uploadFile(file: Blob) {
    const dto = new FormData();
    dto.append('file', file);
    return this.http.post<File>(`${this.apiUrl}/upload`, dto, {
      // headers: {
      //   'Content-type': 'multipart/form-data'
      // }
    });
  }
}
