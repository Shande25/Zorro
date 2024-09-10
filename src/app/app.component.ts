import { Component } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { RouterLink, RouterOutlet } from '@angular/router'; 
import { NzIconModule } from 'ng-zorro-antd/icon'; 
import { NzLayoutModule } from 'ng-zorro-antd/layout'; 
import { NzMenuModule } from 'ng-zorro-antd/menu'; 
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb'; 
import {NzAvatarModule} from 'ng-zorro-antd/avatar'; 
import { NzFlexModule } from 'ng-zorro-antd/flex'; 
import {NzToolTipModule} from 'ng-zorro-antd/tooltip'; 
import { UsersService } from './services/users/users.service'; 
import { RegistersService , Register } from './services/users/registers/registers.service'; 
 import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
 
 
 
@Component({ 
  selector: 'app-root', 
  standalone: true, 
  imports: [CommonModule, RouterLink, RouterOutlet, NzIconModule, NzLayoutModule, NzMenuModule, NzBreadCrumbModule, NzAvatarModule, NzFlexModule , NzToolTipModule,NzDropDownModule], 
  templateUrl: './app.component.html', 
  styleUrls: ['./app.component.css'] 
}) 
export class AppComponent { 
  isCollapsed = false; 
 register?: Register;
  constructor(private usersService: UsersService, public registersService: RegistersService) {} 
 
  ngOnInit(): void {
    
  }
   getRegister() : void {
    this.registersService
    .getRegister(this.usersService.getCurrentUser()!.uid )
    .subscribe((r)=> this.register = r);
  }
  isLooged(): boolean { 
    return this.usersService.getCurrentUser() != null; 
  } 
  onClickLogout(): void {
    this.usersService.logout();
  }
}