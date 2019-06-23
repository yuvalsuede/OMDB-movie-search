import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-page-title',
  template: `
    <div class="page-title">{{ title }}</div>
  `,
  styles: [`
    .page-title {
      color: #373D40;
      font-size: 16px;
      font-weight: 600;
      text-transform: uppercase;
      padding: 25px 0;
      position: relative;
      clear: both;
    }
 `]
})

export class AppPageTitleComponent implements OnInit {
  @Input() title: string;

  constructor() {
  }

  ngOnInit() {
  }
}
