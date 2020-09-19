import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/User';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = "/api";

  private baseUrl: string = environment.backend.baseURL;

  constructor(private http: HttpClient) { 
  }

  getOAuthUrl(service:string): Observable<string> { 
    return this.http.get<string>(this.baseUrl + "/oauth/"+service)
  }

  getUserInfo(id: string): Observable<User>{
    return this.http.get<User>(this.baseUrl +"/user/"+id);
  }

  createPlaylist(playlistName: string, ids: string[]):Observable<boolean> {
    console.log("createplaylist");
    return this.http.post<boolean>(this.baseUrl+"/playlist/" + playlistName, ids);
  }
}
