import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class SendMailService {
  constructor(private http: HttpClient) {}
  sendMail(msg) {
    return this.http.post("http://localhost:8080/sendmail", msg);
  }
}
