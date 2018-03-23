import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

import firebase from 'firebase';

/*
  Generated class for the SaveData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
  	*/
  @Injectable()
  export class SaveData {
    public db;

    constructor(public http: Http, public storage: Storage) {
      this.db=firebase.database();
      //this.pullFromServer();
    }

    pushToServer(){
      this.storage.ready().then(()=>{
        let userId=firebase.auth().currentUser.uid;
        this.storage.get("Favorites").then((favData)=>{
          this.db.ref("/users/"+userId).set({
            Favorites: favData
          });
        });
      });
    }

    pullFromServer(){
      let userId = firebase.auth().currentUser.uid;
      this.db.ref('/users/' + userId).once('value').then((snapshot)=> {
        this.storage.ready().then(()=>{
          if (snapshot.val()!=null)
            this.storage.set("Favorites",snapshot.val().Favorites);
        })
      });
    }

    clearFavorites(){
      this.storage.ready().then(()=>{
        this.storage.set("Favorites",null);
      });
    }

    addToFavorites(favorite: string) {
      this.storage.ready().then(()=>{
        this.getFavorites().then((data)=> {
          let favoritesJSON=JSON.parse(data);
          favoritesJSON.push(JSON.parse(favorite));
          this.setFavorites(JSON.stringify(favoritesJSON));
        });
      });
    }

    setFavorites(favoritesList: string) {
      this.storage.ready().then(()=>{
        this.storage.set("Favorites", favoritesList);
        this.pushToServer();
      });
    }

    removeFavorite(id: number): Promise<any>{
      return new Promise((resolve)=>{
        this.storage.ready().then(()=>{
          this.getFavorites().then((data)=> {
            let favoritesJSON=JSON.parse(data);
            favoritesJSON.splice(id,1);
            this.setFavorites(JSON.stringify(favoritesJSON));
            resolve();
          });
        });
      });
    }

    getFavorites(): Promise<string>{
      return new Promise((resolve) => {
        this.storage.ready().then(()=>{
          this.storage.get("Favorites").then((data)=>{
            if (data==null){
              data="[]";
            }
            resolve(data);
          });
        });
      });
    }
  }
