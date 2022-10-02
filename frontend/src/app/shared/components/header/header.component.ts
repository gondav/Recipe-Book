import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service/auth.service';

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
  isLandingPage = false;
  isUserLoggedIn: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.parent?.url.subscribe({
      next: (url) => {
        this.isLandingPage = url[0].path === 'recipes' && url.length === 1;
      },
      error: (error) => console.log(error),
    });

    this.isUserLoggedIn = this.authService.isUserLoggedIn();
  }

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

  loadLandingPage(): void {
    this.router.navigate(['/recipes']);
  }

  logOutUser(): void {
    this.authService.logOutUser();
    this.isUserLoggedIn = false;
    this.router.navigate(['/recipes']);
  }
}
