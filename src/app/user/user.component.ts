import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { User } from '../User';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Output()
  disconnection: EventEmitter<User> = new EventEmitter<User>();

  @Input()
  user: User;

  constructor() { }

  ngOnInit(): void {
  }

  disconnect(){
    this.disconnection.emit(this.user);
  }

}
