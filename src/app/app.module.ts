import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { Signup } from '../pages/signup/signup';
import { ResetPassword } from '../pages/reset-password/reset-password';
import { Logout } from '../pages/logout/logout';
import { About } from '../pages/about/about';
import { RecipePage } from '../pages/recipe/recipe';
import { FavoritesPage } from '../pages/favorites/favorites';
import { Settings } from '../pages/settings/settings';

import { MealModal } from '../pages/home/meal-modal/meal-modal';
import { IngredientModal } from '../pages/home/ingredient-modal/ingredient-modal';
import { CuisineModal } from '../pages/home/cuisine-modal/cuisine-modal';
import { PrepModal } from '../pages/home/prep-modal/prep-modal';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
	Login,
	Signup,
	ResetPassword,
	Logout,
	About,
	RecipePage,
	FavoritesPage,
	MealModal,
	IngredientModal,
	CuisineModal,
	PrepModal,
	Settings
  ],
  imports: [
    BrowserModule,
	HttpModule,
    IonicModule.forRoot(MyApp),
	IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
	Login,
	Signup,
	ResetPassword,
	Logout,
	About,
	RecipePage,
	FavoritesPage,
	MealModal,
	IngredientModal,
	CuisineModal,
	PrepModal,
	Settings
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
