import { Component, Input } from '@angular/core';

@Component({
  selector: 'angular-nx-tailwind-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() title?: string;
  @Input() url?: string;
}
