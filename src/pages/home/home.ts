import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController, AlertController } from 'ionic-angular';
import { RecipePage } from '../recipe/recipe';

import { MealModal } from './meal-modal/meal-modal';
import { IngredientModal } from './ingredient-modal/ingredient-modal';
import { CuisineModal } from './cuisine-modal/cuisine-modal';
import { PrepModal } from './prep-modal/prep-modal';
import { Storage } from '@ionic/storage';
import { Recipe } from '../../providers/recipe';

const SEARCH_IMAGE="assets/img/foodsearch.svg";
const SEARCH_CLICK="assets/img/foodsearch_click.svg";

@Component({
	selector: 'page-home',
	templateUrl: 'home.html',
	providers: [Recipe]
})
export class HomePage {
	loading: any;

	ingredients: string;
	cuisines: string;
	courses: string;
	methods: string;

	search_image: string;

	constructor(public navCtrl: NavController, public modalCtrl: ModalController, public recipe: Recipe, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public storage: Storage) {
		this.ingredients="";
		this.cuisines="";
		this.courses="";
		this.methods="";

		this.search_image=SEARCH_IMAGE;

		this.storage.ready().then(()=>{
			if (this.storage.get("Settings")==null){
				let settings={
					"diet":false,
					"weightwatcher":false,
					"restrictions":{
						"vegan": false,
						"vegetarian": false,
						"gluten_free": false,
						"dairy_free": false,
						"lowfodmap": false,
						"ketogenic": false,
						"whole30": false
					}
				};
				this.storage.set("Settings",JSON.stringify(settings));
				//	console.log(JSON.stringify(settings))
			}
		});
	}

	mouseDown(){
		this.search_image=SEARCH_CLICK;
	}
	mouseUp(){
		this.search_image=SEARCH_IMAGE;
		this.search();
	}
	showMealModal(){
		let mealModal = this.modalCtrl.create(MealModal,{"checked":this.courses});
		mealModal.onDidDismiss(data => {
			this.courses=data;
		});
		mealModal.present();
	}
	showIngredientModal(){
		let ingModal = this.modalCtrl.create(IngredientModal,{"checked":this.ingredients});
		ingModal.onDidDismiss(data => {
			this.ingredients=data;
		});
		ingModal.present();
	}
	showMethodModal(){
		let methodModal = this.modalCtrl.create(PrepModal,{"checked":this.methods});
		methodModal.onDidDismiss(data => {
			this.methods=data;
		});
		methodModal.present();
	}
	showCuisineModal(){
		let cuisineModal = this.modalCtrl.create(CuisineModal,{"checked":this.cuisines});
		cuisineModal.onDidDismiss(data => {
			this.cuisines=data;
		});
		cuisineModal.present();
	}
	search(){		
		this.recipe.getRecipe(this.ingredients,this.cuisines,this.courses,this.methods)
		.then((data)=>{
			this.loading.dismiss();
			//var jsonData=JSON.parse(data);
			//console.log(JSON.stringify(jsonData));
			this.navCtrl.push(RecipePage,{"recipeData":data,"isFavorite":false});
		}, error =>{
			this.loading.dismiss().then(()=>{
				let alert = this.alertCtrl.create({
					message: "No recipes found!",
					buttons: [
					{
						text: "Ok",
						role: 'cancel'
					}
					]
				});
				alert.present();
			});
		});
		this.loading = this.loadingCtrl.create();
		this.loading.present();
	}
}
