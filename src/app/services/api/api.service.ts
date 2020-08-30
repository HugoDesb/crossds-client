import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/User';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = "/api";

  constructor(private http: HttpClient) { 

  }

  getOAuthUrl(service:string): Observable<string> { 
    return this.http.get<string>(this.apiUrl + "/oauth/"+service)
  }

  getUserInfo(id: string): Observable<User>{
    return this.http.get<User>(this.apiUrl+"/user/"+id);
  }

  createPlaylist(playlistName: string, ids: string[]):Observable<boolean> {
    console.log("createplaylist");
    return this.http.post<boolean>(this.apiUrl+"/playlist/"+playlistName, ids);
  }
}
