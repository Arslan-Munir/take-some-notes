import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../shared/services/auth.service';
import {User} from '../../../shared/models/user.model';
import {StorageService} from '../../../shared/services/storage.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ToastService} from '../../../shared/services/toast.service';

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  isSignUp = false;
  isBusy = false;

  user: User = new User();

  constructor(private authService: AuthService,
              private storageService: StorageService,
              private toast: ToastService,
              private route: Router) {
  }

  ngOnInit(): void {
  }

  toggleSignUp() {
    this.isSignUp = !this.isSignUp;
  }

  userLogin() {
    this.isBusy = true;
    this.authService.logIn(this.user)
      .then((res) => {
        this.storageService.setUser(res.user.uid);
        this.route.navigateByUrl('/');
        this.isBusy = false;
      }).catch((error) => {
      this.toast.error({errorCode: error.code});
      this.isBusy = false;
    });
  }

  userSignUp() {
    this.isBusy = true;
    this.authService.signUp(this.user)
      .then((res) => {
        this.storageService.setUser(res.user.uid);
        this.route.navigateByUrl('/');
        this.isBusy = false;
      }).catch((error) => {
      this.toast.error(error.code);
      this.isBusy = false;
    });
  }
}
