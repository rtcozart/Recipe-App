import { Component } from '@angular/core';
import { AuthData } from '../../providers/auth-data';
import { NavController, } from 'ionic-angular';
import { Login } from '../login/login';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
  providers: [AuthData]
})
export class Logout {

  constructor(public navCtrl: NavController, public authData: AuthData, public storage: Storage) {
	this.authData.logoutUser().then(() => {
		this.navCtrl.setRoot(Login);
	});
  }
}
