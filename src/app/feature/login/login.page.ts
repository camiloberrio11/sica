import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  readerMode$: Subscription;
  constructor(private router: Router) {}

  ngOnInit() {}

  handleLogin(): void {
    this.router.navigate(['/auth/select-construction']);
  }



}
