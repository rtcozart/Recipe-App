import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { SaveData } from '../../providers/save-data';
import { Storage } from '@ionic/storage';
import { Printer } from '@ionic-native/Printer';
import { FavoritesPage } from '../favorites/favorites';

@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
  providers: [SaveData, Printer]
})
export class RecipePage {
  recipeData;
  title: string;
  image: string;
  ingredients: string[];
  instructions: string[];
  prepTime: string;
  cookTime: string;
  servings: number;
  isFavorite: boolean;
  stars: string[];
  showPoints: boolean;
  smartpoints: number;
  imageLoaded: boolean;
  favID: number;

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController, public saveData: SaveData, public butteredToast: ToastController, public storage: Storage, public printer: Printer) {
    this.storage.ready().then(()=>{
      //console.log(this.recipeData);
      this.storage.get("Settings").then((data)=>{
        this.showPoints=JSON.parse(data).weightwatcher;
      });
    });

    //get recipe data from home page and parse
    this.recipeData=JSON.parse(navParams.get('recipeData'));
    this.isFavorite=navParams.get('isFavorite');
    if (this.isFavorite)
      this.favID=navParams.get("favID");

    let recipe=this.recipeData["recipes"][0];

    //Initialize variables
    this.title=recipe["title"];
    this.image=recipe["image"];


    let img=new Image();
    img.src=recipe["image"];

    let thi=this;
    img.onload=function(){
      thi.imageLoaded=true;
    }

    this.servings=recipe["servings"];
    this.smartpoints=recipe["weightWatcherSmartPoints"];

    this.cookTime="";
    this.prepTime="";
    this.stars=[];
    this.ingredients=[];
    this.instructions=[];

    let prepTime=recipe["preparationMinutes"];

    if ((prepTime==null)||(prepTime==0)){
      this.prepTime="n/a";
    } else {
      let prepHr=Math.floor(prepTime/60);
      let prepMin=prepTime%60;
      if (prepHr>0){
        this.prepTime+=prepHr+" hr";
      }
      if (prepMin>0){
        this.prepTime+=" "+prepMin+" min";
      }
    }

    let cookTime=recipe["cookingMinutes"];

    if ((cookTime==null)||(cookTime==0)){
      this.cookTime="n/a";
    } else {
      let cookHr=Math.floor(cookTime/60);
      let cookMin=cookTime%60;
      if (cookHr>0){
        this.cookTime+=cookHr+" hr";
      }
      if (cookMin>0){
        this.cookTime+=" "+cookMin+" min";
      }
    }

    //Fill in ingredients
    let list=recipe["extendedIngredients"];
    for (var ingredient in list){
      this.ingredients.push(list[ingredient]["originalString"]);
    }

    //Fill in steps
    try {
      let steps=recipe["analyzedInstructions"][0]["steps"];
      for (var step in steps){
        this.instructions.push(steps[step]["step"]); //step step step step step
      }
    } catch (e){
      this.instructions.push(recipe["instructions"]);
    }

    let score=recipe["spoonacularScore"];
    console.log(score);
    console.log(score/20);

    for (let i=20;i<120;i+=20){
      if (score>i){

        this.stars.push('star');
      } else if ((score-i)>=-10){
        this.stars.push('star-half');
      } else {
        this.stars.push('star-outline');
      }
    }

  }

  //causes app to crash
  print(){
    this.printer.isAvailable().then(()=>{
      this.printer.print(document.getElementById("Recipe"));
    });
  }


  removeFromFavorites(){
    let alert=this.alertCtrl.create({
      title: 'Remove From Favorites',
      subTitle: 'Remove '+this.title+' From Favorites?',
      buttons: [
      {
        text: 'Yes',
        handler: () => {
          this.saveData.removeFavorite(this.favID).then(()=>{
            let toast=this.butteredToast.create({
              message: "Removed "+this.recipeData["recipes"][0]["title"]+" from Favorites.",
              duration: 3000
            });
            toast.present();
            this.navCtrl.setRoot(FavoritesPage);
          });
        }
      },{
        text: 'No',
        role: 'cancel',
        handler: () => {
        }
      }
      ]
    });

    alert.present();
  }

  addToFavorites() {
    let alert = this.alertCtrl.create({
      title: 'Add to Favorites',
      subTitle: 'Add '+this.recipeData["recipes"][0]["title"]+' to Favorites?',
      buttons: [
      {
        text: 'Yes',
        handler: () => {
          this.isFavorite=true;
          this.saveData.addToFavorites(this.navParams.get("recipeData"));
          let toast=this.butteredToast.create({
            message: "Added "+this.recipeData["recipes"][0]["title"]+" to Favorites.",
            duration: 3000
          });
          toast.present();
        }
      },
      {
        text: 'No',
        role: 'cancel'
      }
      ]
    });
    alert.present();
  }

}