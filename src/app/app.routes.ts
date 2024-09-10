import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ProductosEmpleadosComponent } from './pages/productos-empleados/productos-empleados.component';
import { rolesGuard } from './guards/roles.guard';
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES) },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'productos', component: ProductosComponent,canMatch: [rolesGuard]},
  {path : 'empleados', component: ProductosEmpleadosComponent, canMatch: [rolesGuard]}
];
