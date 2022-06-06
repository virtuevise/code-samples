import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AuthContextService } from "src/app/services/auth-context.service";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class FileService {
  public readonly baseApiUrl: string = `${environment.endPointApi}/File`;

  constructor(private http: HttpClient, public authCtx: AuthContextService) {}

  upload(file: any): Promise<string> {
    const formData = new FormData();

    formData.append("file", file);

    return this.http
      .post(this.baseApiUrl + "/upload", formData)
      .toPromise<any>();
  }

  downloadFile(fileId: string): any {
    return this.http
      .get(this.baseApiUrl + `/download/${fileId}`, {
        responseType: "blob",
      })
      .pipe(
        map((result: any) => {
          return result;
        })
      );
  }

  download(fileId: string): Promise<any> {
    return fetch(this.baseApiUrl + `/download/${fileId}`, {
      method: "GET",
      headers: new Headers({
        responseType: "blob",
      }),
    });
  }
}
