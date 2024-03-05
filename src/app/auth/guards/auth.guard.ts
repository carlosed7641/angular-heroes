import { inject } from "@angular/core"
import { CanActivateFn, CanMatchFn, Router } from "@angular/router"
import { AuthService } from "../services/auth.service"
import { Observable, tap } from "rxjs"

export const AuthGuard = (): Observable<boolean> => {

  const authService = inject(AuthService)
  const router = inject(Router)

  return authService.checkAuth()
    .pipe(
      tap(isAuth => console.log('isAuth', isAuth)),
      tap(isAuth => {
        if (!isAuth) {
          router.navigate(['/auth/login'])
        }
      })
    )
}

