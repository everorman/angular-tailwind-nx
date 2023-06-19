import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'angular-nx-tailwind-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() title?: string;
  @Input() url?: string;

  @ContentChild('cardBodyTemplate', { static: false })
  cardBodyTemplateRef!: TemplateRef<any>;
  @ContentChild('cardButtonTemplate', { static: false })
  cardButtonTemplateRef!: TemplateRef<any>;
}
