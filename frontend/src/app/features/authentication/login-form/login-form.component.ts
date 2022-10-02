import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service/auth.service';
import { take, exhaustMap } from 'rxjs';
import { RecipeService } from '../../../core/services/recipe-service/recipe.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/recipes';
  }

  submitLogin(): void {
    this.authService
      .loginUser(this.loginForm.value)
      .pipe(
        take(1),
        exhaustMap((_response) => this.recipeService.getSavedRecipes())
      )
      .subscribe({
        next: (_response) => this.router.navigate([this.returnUrl]),
        error: (error) => console.log(error),
      });
  }
}
