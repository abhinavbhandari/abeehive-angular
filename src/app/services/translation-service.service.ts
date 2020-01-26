import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private http: HttpClient) { 
  }


  // private handleError(error: HttpErrorResponse) {
  // if (error.error instanceof ErrorEvent) {
  //   // A client-side or network error occurred. Handle it accordingly.
  //   console.error('An error occurred:', error.error.message);
  // } else {
  //   // The backend returned an unsuccessful response code.
  //   // The response body may contain clues as to what went wrong,
  //   console.error(
  //     `Backend returned code ${error.status}, ` +
  //     `body was: ${error.error}`);
  // }
  //    // return an observable with a user-facing error message
  //   return throwError(
  //     'Something bad happened; please try again later.');
  // };

  async getTranslationJson(text_en) {
	let apiURL = "https://djangotranslationapi-nup2wyfnsq-uc.a.run.app/sentencepairs/";
	const proxyurl = "https://cors-anywhere.herokuapp.com/" + apiURL;
	var res = await this.http.post(proxyurl, {"text": "my name is"}).toPromise();
	var response_text: any;
	
	return res;
	//return response_text;
  }
}
