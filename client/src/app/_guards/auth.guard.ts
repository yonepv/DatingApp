import { ToastrService } from 'ngx-toastr';
import { AccountService } from './../_services/account.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private accountService: AccountService, private toastr: ToastrService) { }

  canActivate(): Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      map(user => {
        console.log("in auth guard, user: " + user);
        if (user) return true;
        console.log("in auth guard, no user then should display error");
        this.toastr.error('You shall not pass!');
        return false;
      })
    )
  }
}
