import { 
  NavController, 
  LoadingController, 
  AlertController } from 'ionic-angular';
  import { Component } from '@angular/core';
  import { FormBuilder, Validators } from '@angular/forms';
  import { AuthData } from '../../providers/auth-data';
  import { SaveData } from '../../providers/save-data';
  import { Signup } from '../signup/signup';
  import { HomePage } from '../home/home';
  import { ResetPassword } from '../reset-password/reset-password';
  import { EmailValidator } from '../../validators/email-validator';
  import { Storage } from '@ionic/storage';

  @Component({
    selector: 'page-login',
    templateUrl: 'login.html',
    providers: [AuthData, SaveData]
  })
  export class Login {
    public loginForm;
    loading: any;

    constructor(public nav: NavController, public authData: AuthData, public formBuilder: FormBuilder,
      public alertCtrl: AlertController, public loadingCtrl: LoadingController, public storage: Storage, public saveData: SaveData) {

      if (this.authData.loggedIn()){
        this.nav.setRoot(HomePage);
        this.saveData.pullFromServer();
      }
      this.loginForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      });
    }

  /**
   * If the form is valid it will call the AuthData service to log the user in displaying a loading component while
   * the user waits.
   *
   * If the form is invalid it will just log the form value, feel free to handle that as you like.
   */
   loginUser(): void {
     if (!this.loginForm.valid){
       console.log(this.loginForm.value);
     } else {

       this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password).then( authData => {
         this.loading.dismiss().then( () => {
           this.nav.setRoot(HomePage);
           this.saveData.pullFromServer();
         });
       }, error => {
         this.loading.dismiss().then( () => {
           let alert = this.alertCtrl.create({
             message: error.message,
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

       this.loading = this.loadingCtrl.create({content: "Logging in..."});
       this.loading.present();
     }
   }

   goToSignup(): void {
     this.nav.push(Signup);
   }

   goToResetPassword(): void {
     this.nav.push(ResetPassword);
   }

 }