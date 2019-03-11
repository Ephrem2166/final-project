import { map, catchError } from 'rxjs/operators';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';


// Define constants
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const userApiURL = "/api/user";
const followApiURL = "/api/follow";
@Injectable({
  providedIn: 'root'
})
export class FollowService {

  constructor(private http: HttpClient) { }

  /**
    * Follow a user  
    */
  followUser(data): Observable<any> {
    const url = `${followApiURL}/add`;
    return this.http.post(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }



  /**
   * returns a http call to recieve a users following data.
   * 
   * @param id the object id of the user we want to return following data for.
   */
  getFollowers(id: string): Observable<any> {
    const url = `${userApiURL}/follow/${id}`;
    console.log("[DEBUG] getFollowers id/username: ", id);
    return this.http.get(url, httpOptions).pipe(
      catchError(this.handleError));
  }



  private extractData(res: Response) {
    let body = res;
    return body || {};
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // console.error('DEBUG HANDLE ERROR:',error.error.message)
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  };

}
