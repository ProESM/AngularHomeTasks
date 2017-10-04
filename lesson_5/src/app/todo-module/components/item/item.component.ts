import { Component, OnInit, Input } from '@angular/core';

import { ITodo } from './../../../shared/models/itodo';

@Component({
  selector: 'item-component',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input()
  todo: ITodo;

  constructor() {

  }

  ngOnInit() { }
}
