import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from './../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  registerForm!: FormGroup;

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(8),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        this.matchValues('password'),
      ]),
    });
    this.registerForm.controls.password.valueChanges.subscribe(() => {
      this.registerForm.controls.confirmPassword.updateValueAndValidity();
    });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      //suggested solution from Q/A section in this lecture (S12.143)
      const c = control?.parent?.controls as any;
      return c
        ? control?.value === c[matchTo]?.value
          ? null
          : { isMatching: true }
        : null;
      /*
      //not working, giving an error: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ [key: string]: AbstractControl; } | AbstractControl[]'.
      //No index signature with a parameter of type 'string' was found on type '{ [key: string]: AbstractControl; } | AbstractControl[]'.ts(7053)
      return control?.value === control?.parent?.controls[matchTo].value
        ? null
        : { isMatching: true };
        */
    };
  }

  register() {
    console.log(this.registerForm.value);
    // console.log(this.model);
    // this.accountService.register(this.model).subscribe(
    //   (response) => {
    //     console.log(response);
    //     this.cancel();
    //   },
    //   (error) => {
    //     console.log(error);
    //     this.toastr.error(error.error);
    //   }
    // );
  }

  cancel() {
    console.log('cancelled');
    this.cancelRegister.emit(false);
  }
}
