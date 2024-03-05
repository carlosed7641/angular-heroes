import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroments } from '../../../environments/environment';
import { User } from '../interface/user.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

  private baseUrl = enviroments.baseUrl
  private user?: User

  constructor(private http: HttpClient) { }

  getCurrentUser(): User | undefined {

    if (!this.user) return this.user

    return structuredClone(this.user)

  }

  login(email: string, password: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user => {
          this.user = user
          localStorage.setItem('token', '21e3f4r44g4gt456')
        })
      )
  }

  checkAuth(): Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false)

    //const token = localStorage.getItem('token')

    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user => {
          this.user = user
        }),
        map(user => !!user),
        catchError(error => of(false))
      )
  }

  logout(): void {
    this.user = undefined
    localStorage.removeItem('token')
  }

}
