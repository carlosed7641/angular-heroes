import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interface/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styles: ``
})
export class LayoutComponent {

  sidebarItems = [
    { label: 'Listado', icon: 'label', url: './list'},
    { label: 'Añadir', icon: 'add', url: './new-hero'},
    { label: 'Buscar', icon: 'search', url: './search'}
  ]

  constructor(private authService: AuthService, private router: Router) { }

  get user(): User | undefined {
    return this.authService.getCurrentUser()
  }

  onLogout(): void {
    this.authService.logout()
    this.router.navigate(['/auth/login'])
  }
}
