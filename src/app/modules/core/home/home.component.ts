import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {StorageService} from '../../shared/services/storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isUserLoggedIn = false;

  constructor(private authService: AuthService,
              private storageService: StorageService,
              private route: Router) {
  }

  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()) {
      this.isUserLoggedIn = true;
    }
  }

  logOut() {
    this.authService.logOut()
      .then(() => {
        this.storageService.removeUser();
        this.isUserLoggedIn = false;
        this.route.navigateByUrl('account');
      });
  }
}
