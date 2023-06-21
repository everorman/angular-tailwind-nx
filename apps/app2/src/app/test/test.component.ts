import { Component, Input, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'angular-nx-tailwind-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent {
  @ViewChild('drawer', { static: false }) drawer!: MatDrawer;

  toggle() {
    console.log('Opening');
    this.drawer.toggle();
  }
}
