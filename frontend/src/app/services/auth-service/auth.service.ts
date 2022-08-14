import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-service/base.service';
import { IRegistrationRequestModel } from '../../shared/models/requests/IRegistrationRequestModel';
import { environment } from '../../../environments/environment';
import { map, tap, Observable } from 'rxjs';
import { IRegistrationResponseModel } from '../../shared/models/responses/IRegistrationResponseModel';
import { Router } from '@angular/router';
import { ILoginRequestModel } from '../../shared/models/requests/ILoginRequestModel';
import { ILoginResponseModel } from '../../shared/models/responses/ILoginResponseModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private baseHttpService: BaseHttpService,
    private router: Router
  ) {}

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  getToken(): string {
    return localStorage.getItem('accessToken') as string;
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
          this.router.navigate(['/recipes']);
        })
      );
  }

  logOutUser(): void {
    localStorage.clear();
  }
}
