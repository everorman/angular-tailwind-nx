import { Component } from '@angular/core';
import { NodeClickEvent } from '@progress/kendo-angular-treeview';
import { groupBy, GroupResult } from '@progress/kendo-data-query';

interface Sample {
  interval: number;
  service: string;
  value: number;
}

interface Model {
  product: string;
  sales: number;
}
@Component({
  selector: 'angular-nx-tailwind-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent {
  public seriesData: Model[] = [
    {
      product: 'Chai',
      sales: 200,
    },
    {
      product: 'Others',
      sales: 250,
    },
  ];

  public data: Sample[] = [
    {
      interval: 1,
      service: 'Service 1',
      value: 5,
    },
    {
      interval: 2,
      service: 'Service 1',
      value: 15,
    },
    {
      interval: 3,
      service: 'Service 1',
      value: 10,
    },
    {
      interval: 1,
      service: 'Service 2',
      value: 10,
    },
    {
      interval: 2,
      service: 'Service 2',
      value: 5,
    },
    {
      interval: 3,
      service: 'Service 2',
      value: 15,
    },
  ];

  public series: GroupResult[];

  public expandedKeys: any[] = ['0', '1'];

  public checkedKeys: any[] = ['0_1'];

  public dataTreeView: any[] = [
    {
      text: 'Furniture',
      items: [
        { text: 'Tables & Chairs' },
        { text: 'Sofas' },
        { text: 'Occasional Furniture' },
      ],
    },
    {
      text: 'Decor',
      items: [
        { text: 'Bed Linen' },
        { text: 'Curtains & Blinds' },
        { text: 'Carpets' },
      ],
    },
  ];

  constructor() {
    this.series = groupBy(this.data, [{ field: 'service' }]) as GroupResult[];
  }

  public onNodeClick(event: NodeClickEvent): void {
    console.log('Event', event);
  }
}
