import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Folder } from '../interfaces/folder.interface';
import { GetImagesFullResponse } from '../interfaces/get-images-full-response.interface';
import { Resource } from '../interfaces/resource.interface';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private returnedNextCursor = '';

  constructor(private readonly http: HttpClient) {}

  public getAllImages(
    folderNames?: string[],
    fileTypes?: string[],
    limit?: number
  ): Observable<Resource[]> {
    let params: { [index: string]: string } = {};
    if (folderNames?.length) {
      params['folderNames'] = folderNames.join(',');
    }
    if (fileTypes?.length) {
      params['resourceTypes'] = fileTypes.join(',');
    }
    if (limit) {
      params['limit'] = limit.toString();
    }
    if (this.returnedNextCursor) {
      params['cursor'] = this.returnedNextCursor;
    }

    const options = { params: params };

    return this.http
      .get<GetImagesFullResponse>(`${environment.apiUrl}/media`, options)
      .pipe(
        tap((data: GetImagesFullResponse) => {
          this.returnedNextCursor = data.next_cursor;
        }),
        map((data: GetImagesFullResponse) => {
          return data.resources;
        })
      );
  }

  public getAllFolders(): Observable<Folder[]> {
    return this.http.get<Folder[]>(`${environment.apiUrl}/media/folders`);
  }

  public uploadImage(file: File): Observable<HttpEvent<unknown>> {
    const formData = new FormData();
    formData.append('file', file);

    const options = {
      headers: new HttpHeaders().set('enctype', 'multipart/form-data'),
      reportProgress: true,
      observe: 'events',
    };

    const headers = new HttpHeaders();
    headers.set('Content-Type', 'multipart/form-data');

    const req = new HttpRequest(
      'POST',
      `${environment.apiUrl}/media/image`,
      formData,
      options
    );

    return this.http.request(req);
  }

  public uploadVideo(video: File): Observable<HttpEvent<unknown>> {
    const formData = new FormData();
    formData.append('video', video);

    const options = {
      headers: new HttpHeaders().set('enctype', 'multipart/form-data'),
      reportProgress: true,
      observe: 'events',
    };

    const req = new HttpRequest(
      'POST',
      `${environment.apiUrl}/media/video`,
      formData,
      options
    );
    return this.http.request(req);
  }

  public deleteImage(publicId: string): Observable<Object> {
    return this.http.delete(`${environment.apiUrl}/media/image`, {
      params: {
        publicId,
      },
    });
  }

  public deleteVideo(publicId: string): Observable<Object> {
    return this.http.delete(`${environment.apiUrl}/media/video`, {
      params: {
        publicId,
      },
    });
  }

  public resetNextCursor(): void {
    this.returnedNextCursor = '';
  }
}
