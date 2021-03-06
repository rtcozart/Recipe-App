import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-meal-modal',
  templateUrl: 'meal-modal.html',
})
export class MealModal {

  checked: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
	  this.checked=navParams.get('checked');
  }

  dismiss(){
	  this.viewCtrl.dismiss(this.checked);
  }
}
