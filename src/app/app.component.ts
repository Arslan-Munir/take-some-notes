import {Component, OnInit} from '@angular/core';
import {AuthService} from './modules/shared/services/auth.service';
import {StorageService} from './modules/shared/services/storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Take some notes';
  isUserLoggedIn = false;

  constructor(private authService: AuthService,
              private storageService: StorageService,
              private route: Router) {
  }

  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()) {
      this.route.navigateByUrl('/');
    }else{
      this.route.navigateByUrl('account');
    }
  }
}
