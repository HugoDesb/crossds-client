import { Component } from '@angular/core';
import {findLast} from '@angular/compiler/src/directive_resolver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'matelist';
  displayError = false;
  loading = false;



  showSpinner(message: string): void {
    this.loading = true;
  }

  hideSpinner(){
    this.loading = false;
  }

}
