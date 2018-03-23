import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-ingredient-modal',
  templateUrl: 'ingredient-modal.html',
})
export class IngredientModal {
	checked: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
	  	   this.checked=navParams.get('checked');
  }

  dismiss(){
	  this.viewCtrl.dismiss(this.checked);
  }
}
