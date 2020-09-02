import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Welcome to  clever-crop';

  constructor(
    private swUpdate: SwUpdate
  ) {}

  ngOnInit() {
    if(this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if(confirm('New version available, would like to update?')) {
          window.location.reload();
        }
      })
    }
  }
}
