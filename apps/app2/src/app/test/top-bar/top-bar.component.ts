import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'angular-nx-tailwind-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent {
  @Output() toggleEvent = new EventEmitter();

  toggle(): any {
    this.toggleEvent.emit(true);
  }
}
