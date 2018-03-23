import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestOptions, RequestOptionsArgs, URLSearchParams } from '@angular/http';
import { Storage } from '@ionic/storage';

const HEADERS={
	//no longer have access to API
	'X-Mashape-Key': ''
};

const URL='https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random';


@Injectable()
export class Recipe {


	constructor(public http: Http, public storage: Storage) {

	}

	getRecipe(ingredients: string, cuisines: string, courses: string, methods: string): Promise<string> {
		return new Promise((resolve,reject)=>{
			this.storage.ready().then(()=>{
				this.storage.get("Settings").then((data)=>{
					let settings=JSON.parse(data);
					let parameters=new URLSearchParams();

					let group=[ingredients,cuisines,courses,methods]
					for (var i=group.length-1;i>=0;i--){
						if ((group[i]=="") || (group[i]==null))
							group.splice(i,1)
					}

					let tags=group.join(',');

					parameters.append("number","1");
					parameters.append("instructionsRequired","true");
					if (settings!=null){
						if (settings.diet){
							if (settings.restrictions.vegan)
								tags+=",vegan";
							if (settings.restrictions.vegetarian)
								tags+=",vegetarian";
							if (settings.restrictions.gluten_free)
								tags+=",gluten free";
							if (settings.restrictions.dairy_free)
								tags+=",dairy free";
							if (settings.restrictions.lowfodmap)
								tags+=",lowfodmap";
							if (settings.restrictions.ketogenic)
								tags+=",ketogenic";
							if (settings.restrictions.whole30)
								tags+=",whole30";
						}
					}
					parameters.append("tags",tags);

					let args:RequestOptionsArgs={
						url: URL,
						method: 'GET',
						params: parameters,
						headers: new Headers(HEADERS)
					}
					let reqOptions=new RequestOptions(args);
					let request=new Request(reqOptions);

					console.log(URL+"?tags="+tags);

					this.http.request(request)
					.subscribe(
						function(response){resolve(response["_body"])},
						function(error){reject(error)}
						);

				});
			});
		});
	}
}
