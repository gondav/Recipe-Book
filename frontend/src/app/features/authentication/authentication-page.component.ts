import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-authentication-page',
  templateUrl: './authentication-page.component.html',
  styleUrls: ['./authentication-page.component.scss'],
})
export class AuthenticationPageComponent implements OnInit {
  formType: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.parent?.url.subscribe({
      next: (url) => (this.formType = url[0].path),
      error: (error) => console.log(error),
    });
  }
}
