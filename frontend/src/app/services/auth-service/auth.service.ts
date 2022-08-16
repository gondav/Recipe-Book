import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-service/base.service';
import { IRegistrationRequestModel } from '../../shared/models/requests/IRegistrationRequestModel';
import { environment } from '../../../environments/environment';
import { map, tap, Observable } from 'rxjs';
import { IRegistrationResponseModel } from '../../shared/models/responses/IRegistrationResponseModel';
import { Router } from '@angular/router';
import { ILoginRequestModel } from '../../shared/models/requests/ILoginRequestModel';
import { ILoginResponseModel } from '../../shared/models/responses/ILoginResponseModel';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IAuthPayload } from '../../shared/models/responses/IAuthPayload';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private jwtHelperService = new JwtHelperService();
  private tokenExpirationDate: number;
  private tokenExpirationDuration: number;
  private tokenExpirationTimer: any;

  constructor(
    private baseHttpService: BaseHttpService,
    private router: Router
  ) {}

  isUserLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  getToken(): string {
    return localStorage.getItem('accessToken') as string;
  }

  getUserId(): number {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      return 0;
    }
    return +userId;
  }

  private setTokenExpirationDate(): void {
    const token = this.getToken();

    if (token) {
      const authPayload = this.jwtHelperService.decodeToken(
        token
      ) as IAuthPayload;

      this.tokenExpirationDate = authPayload.exp * 1000;
    }
  }

  private getTokenExpirationDuration(): void {
    const currTime = new Date().getTime();
    this.tokenExpirationDuration = this.tokenExpirationDate - +currTime;
  }

  private setToken(accessToken: string): void {
    localStorage.setItem('accessToken', accessToken);
  }

  private setEmail(email: string): void {
    localStorage.setItem('email', email);
  }

  private setUserId(userId: number): void {
    localStorage.setItem('userId', String(userId));
  }

  private saveDataToLocalStorage(userData: ILoginResponseModel): void {
    this.setToken(userData.accessToken);
    this.setEmail(userData.email);
    this.setUserId(userData.id);
  }

  private autoLogOut(): void {
    this.setTokenExpirationDate();
    this.getTokenExpirationDuration();

    this.tokenExpirationTimer = setTimeout(() => {
      this.logOutUser();
    }, this.tokenExpirationDuration);
  }

  registerUser(
    registrationData: IRegistrationRequestModel
  ): Observable<IRegistrationResponseModel> {
    return this.baseHttpService
      .createItem<IRegistrationResponseModel>(
        environment.userEndpoint,
        registrationData
      )
      .pipe(
        tap((_response) => {
          this.router.navigate(['/login']);
        }),
        map((response) => {
          return {
            message: response.message,
          };
        })
      );
  }

  loginUser(loginData: ILoginRequestModel): Observable<ILoginResponseModel> {
    return this.baseHttpService
      .createItem<ILoginResponseModel>(environment.userLoginEndpoint, loginData)
      .pipe(
        tap((userData) => {
          this.saveDataToLocalStorage(userData);
          this.autoLogOut();
        })
      );
  }

  logOutUser(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.isUserLoggedIn();
  }
}
