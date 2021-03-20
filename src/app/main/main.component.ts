import { Component, Inject, Injectable, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from '../services/api/api.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { User } from '../User';
import { observable, computed } from 'mobx-angular';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

@Injectable()
export class MainComponent implements OnInit {

  choose = false;

  @observable
  userList = [];

  @observable
  name;


  playlistForm;

  constructor(private route: ActivatedRoute,
              private apiService: ApiService,
              private formBuilder: FormBuilder,
              @Inject(DOCUMENT) private document: Document) {
    this.playlistForm = this.formBuilder.group({
      name: new FormControl(this.name, [
        Validators.required,
      ])
    });

    this.userList = this.getLoggedUsers();
  }

  @computed
  get isCreationPossible(){
    return this.userList.some((el) => el.platform === 'deezer')
      && this.userList.some((el) => el.platform === 'spotify' );
  }

  ngOnInit(): void {
    console.log(this.userList);
    this.route.queryParams.subscribe(params => {
      if (params.id !== undefined){
        this.apiService.getUserInfo(params.id).subscribe(user => {
          this.addLoggedUser(user);
        });
      }
    });
  }

  onSubmit(value) {
    if (this.isCreationPossible){
      console.log('Possible');
      const ids: string[] = this.userList.map((element) => element.id);
      this.createPlaylist(value.name, ids);
    }else{
      console.log('Not Possible');
    }
  }

  createPlaylist(name: string, ids: string []): void{
    if (true){
      // this.apiService.createPlaylist(playlistName, ids)
      this.apiService.createPlaylist(name, ids).subscribe((ret) => {
        console.log('Sucess playlistCreation : ' + ret);
      });
    }
  }

  disconnect(user: User){
    this.deleteLoggedUser(user);
  }

  addAccount(service: string): void {
    this.apiService.getOAuthUrl(service).subscribe(url => {
      this.document.location.href = url;
    });
  }

  private addLoggedUser(user: User): void{
    const exists = this.userList.some((element) => element.id === user.id);
    if (!exists){
      this.userList.push(user);
      this.saveLoggedUsers();
    }
  }

  private deleteLoggedUser(user: User): void{

    const index = this.userList.findIndex((element) => element.id === user.id);
    if (index !== -1){
      // found
      this.userList.splice(index, 1);
      this.saveLoggedUsers();
    }
  }

  private clearLoggedUsers(){
    this.userList = [];
    this.saveLoggedUsers();
  }

  private getLoggedUsers(): User[] {
    const tmp = JSON.parse(localStorage.getItem('users'));
    if (tmp == null){
      return [];
    }else{
      return tmp;
    }
  }

  private saveLoggedUsers(): void{
    localStorage.setItem('users', JSON.stringify(this.userList));
  }

}
