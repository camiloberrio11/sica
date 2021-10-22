import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  readerMode$: Subscription;
  constructor(private router: Router, private nfc: NFC, private ndef: Ndef) {}

  ngOnInit() {}

  handleLogin(): void {
    this.router.navigate(['/auth/select-construction']);
  }


  onNfc() {
    // console.log(nfcEvent.tag);
    const message = [this.ndef.textRecord('abc32102')];

    this.nfc.write(
      message,
      // (success) => console.log('wrote data to tag'),
      // (error) => console.log(error)
    );
  }

  readNfc(): void {
    const flags = this.nfc.FLAG_READER_NFC_A | this.nfc.FLAG_READER_NFC_V;
    this.readerMode$ = this.nfc.readerMode(flags).subscribe(
      (tag) => console.log(JSON.stringify(tag)),
      (err) => console.log('Error reading tag', err)
    );
  }
}
