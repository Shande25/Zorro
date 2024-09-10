import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import {NzSelectModule} from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';
import { FormGroup,FormBuilder,Validators,ReactiveFormsModule, ValidatorFn, AbstractControl } from '@angular/forms';
import { RegistersService } from '../../services/users/registers/registers.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NzFormModule,NzInputModule,NzButtonModule,NzCheckboxModule,ReactiveFormsModule,NzIconModule,RouterLink,NzSelectModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

   form: FormGroup;
   
   constructor(private fb: FormBuilder , private registersService: RegistersService) {
     this.form = this.fb.group({
       email: ["", [Validators.required, Validators.email]],
       password: ["", [Validators.required, Validators.minLength(6)]],
       confirmpassword: ["  ", [this.confirmationValidator]],
       nickname: ["", [Validators.required]],
       phoneNumber : ["", [Validators.required]],
       agree: [false],
       photoURL : [""],
       role: ["Empleado"],
     });
   }
   updateConfirmValidator(): void {
    Promise.resolve().then(() => this.form.controls["confirmpassword"].updateValueAndValidity());
  }

  confirmationValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.form.controls["password"].value) {
      return { confirm: true, error: true };
    }
    return {};
  };
  onClickRegister():void{
    if(this.form.invalid)
    this.registersService.createRegister(this.form.value, this.form.value)
    .then((response) => {
      console.log(response);
    })
    .catch(error => console.log(error));
  }
  onClickRegisterGoogle():void{
    this.registersService.createRegisterWithGoogle(this.form.value)
    .then((response) => {
      console.log(response);
    })
    .catch(error => console.log(error));
  }
}
