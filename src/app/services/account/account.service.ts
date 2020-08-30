import { Injectable } from '@angular/core';
import { User } from '../../User';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  users = [];

  constructor() {
      this.users = this.getLoggedUsers();
  }

  addLoggedUser(user: User): void{
    if(this.users.indexOf(user) == -1){
      this.users.push(user);
      this.saveLoggedUsers();
    }
    
  }

  deleteLoggedUser(user: User): void{
    var iof = this.users.indexOf(user);
    if(iof>-1){
      //found 
      this.users.splice(iof, 1);
      this.saveLoggedUsers();
    }
  }

  clearLoggedUsers(){
    this.users = [];
    this.saveLoggedUsers();
  }


  getLoggedUsers() : User[] {
    var tmp = JSON.parse(localStorage.getItem("users"));
    console.log("TA RACE");
    console.log(tmp);
    if(tmp == null){
      return [];
    }else{
      return tmp;
    }
  }

  saveLoggedUsers():void{
    localStorage.setItem("users", JSON.stringify(this.users));
  }
}
