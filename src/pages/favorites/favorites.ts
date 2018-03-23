  import { Component, ViewChild } from '@angular/core';
  import { NavController, NavParams, Content } from 'ionic-angular';
  import { AlertController, ActionSheetController } from 'ionic-angular';
  import { SaveData } from '../../providers/save-data';
  import { RecipePage } from '../recipe/recipe';
  /*
  Generated class for the Favorites page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  @Component({
    selector: 'page-favorites',
    templateUrl: 'favorites.html',
    providers: [SaveData]
  })
  export class FavoritesPage {
    @ViewChild(Content) content: Content;
    favorites;
    fav_basic: any[];

    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public saveData: SaveData,  public actionSheetCtrl: ActionSheetController) {
      this.saveData.pullFromServer();
      this.fav_basic=[{image:"",title:""}];
      let fav_basic=[];
      saveData.getFavorites().then((data)=>{
        //console.log(data);
        this.favorites=JSON.parse(data);
        for (let i=0;i<this.favorites.length;i++){
          let recipe=this.favorites[i]["recipes"][0];
          let item={
            title: recipe["title"],
            image: recipe["image"],
            id: i
          }
          fav_basic.push(item);
        }
        this.fav_basic=fav_basic;
        this.content.resize();
      });
      
    }


    viewFavorite(favID: number){
      let data=JSON.stringify(this.favorites[favID]);
      this.navCtrl.push(RecipePage,{"recipeData":data, "isFavorite":true, "favID":favID});
    }

  }
