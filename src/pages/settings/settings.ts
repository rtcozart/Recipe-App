import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the Settings page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 @Component({
 	selector: 'page-settings',
 	templateUrl: 'settings.html',
 })
 export class Settings {
 	diet: boolean;
 	weightwatcher:boolean;
 	vegan:boolean;
 	vegetarian:boolean;
 	gluten_free:boolean;
 	dairy_free:boolean;
 	lowfodmap:boolean;
 	ketogenic:boolean;
 	whole30:boolean;

 	constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
 		this.storage.ready().then(()=>{
 			this.storage.get("Settings").then((data)=>{
 				if (data!=null){
 					let settings=JSON.parse(data);
 					this.diet=settings.diet;
 					this.weightwatcher=settings.weightwatcher;
 					this.vegetarian=settings.restrictions.vegetarian;
 					this.vegan=settings.restrictions.vegan;
 					this.gluten_free=settings.restrictions.gluten_free;
 					this.dairy_free=settings.restrictions.dairy_free;
 					this.lowfodmap=settings.restrictions.lowfodmap;
 					this.ketogenic=settings.restrictions.ketogenic;
 					this.whole30=settings.restrictions.whole30;
 				} else {
 					this.diet=false;
 					this.weightwatcher=false;
 					this.vegan=false;
 					this.vegetarian=false;
 					this.gluten_free=false;
 					this.dairy_free=false;
 					this.lowfodmap=false;
 					this.ketogenic=false;
 					this.whole30=false;
 				}
 			});
 		});
 	}

 	ionViewWillLeave() {
 		this.storage.ready().then(()=>{
 			let settings={
 				"diet":this.diet,
 				"weightwatcher":this.weightwatcher,
 				"restrictions":{
 					"vegan": this.vegan,
 					"vegetarian": this.vegetarian,
 					"gluten_free": this.gluten_free,
 					"dairy_free": this.dairy_free,
 					"lowfodmap": this.lowfodmap,
 					"ketogenic": this.ketogenic,
 					"whole30": this.whole30
 				}
 			};
 			this.storage.set("Settings",JSON.stringify(settings));
 		//	console.log(JSON.stringify(settings))
 		});
 	}

 }
