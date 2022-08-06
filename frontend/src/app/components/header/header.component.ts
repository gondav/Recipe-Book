import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('subMenuState', [
      state('start', style({ overflow: 'hidden', height: '0', opacity: '0' })),
      state('end', style({ height: '*', opacity: '1' })),
      transition('start => end', animate(250)),
      transition('end => start', animate(250)),
    ]),
  ],
})
export class HeaderComponent implements OnInit {
  state = 'start';

  constructor() {}

  ngOnInit(): void {}

  openSubMenu(): void {
    this.state = 'end';
  }

  closeSubMenu(): void {
    this.state = 'start';
  }

  toggleSubMenu(): void {
    this.state === 'start' ? this.openSubMenu() : this.closeSubMenu();
  }

  toggleMobMenu(mobMenu: HTMLDivElement): void {
    mobMenu.style.display === 'block'
      ? (mobMenu.style.display = 'none')
      : (mobMenu.style.display = 'block');
  }
}
