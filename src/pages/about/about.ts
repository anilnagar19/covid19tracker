import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from 'ionic-angular';
import { WorldDetailPage } from '../world-detail/world-detail';
@Component({
	selector: 'page-about',
	templateUrl: 'about.html'
})
export class AboutPage {
	loading: any;
	countriesData: any = [];
	tempCountryData: any = [];

	searchText: string = '';

	constructor(public navCtrl: NavController, private http: HttpClient, private loadingCtrl: LoadingController) { }

	ionViewDidEnter() {
		this.getCoronaData();
		this.searchText = '';
	}

	getCoronaData(refresher?) {
		if (!this.loading) {
			this.loading = this.loadingCtrl.create({
				content: 'Loading'
			});
			this.loading.present();
		}
		this.getWorldData().subscribe((res: any) => {

			let Filtereddata = [];

			this.filterData(res.data).then((res) => {
				Object.keys(res).forEach((key) => {
					let totalConfirmed = res[key].value.reduce((prev, cur) => {
						return prev + cur.Confirmed;
					}, 0);
					let totalRecovered = res[key].value.reduce((prev, cur) => {
						return prev + cur.Recovered;
					}, 0);
					let totalDeath = res[key].value.reduce((prev, cur) => {
						return prev + cur.Deaths;
					}, 0);
					let Last_Update = res[key].value.reduce((prev, cur) => {
						return cur.Last_Update;
					}, 0);

					res[key].totalDeath = totalDeath;
					res[key].totalConfirmed = totalConfirmed;
					res[key].totalRecovered = totalRecovered;
					res[key].Last_Update = Last_Update;

					Filtereddata.push(res[key]);
					this.countriesData = Filtereddata;
					this.tempCountryData = Filtereddata;
				});
			});
			if (refresher) {
				refresher.complete();
			}
			this.loading.dismiss();
			this.loading = null;
		});
	}

	getWorldData() {
		return this.http.get('https://covid19-indiatoday.front10.cloud/api/indexIndia');
	}

	filterData(array) {
		return new Promise((resolve, reject) => {
			let output = {};
			array.forEach((item) => {
				if (!output[item.Country_Region]) {
					output[item.Country_Region] = {
						country: item.Country_Region,
						value: []
					};
				}

				output[item.Country_Region].value.push(item);
				resolve(output);
			});
		})
	}

	getCountrySearchData(ev) {
		this.countriesData = this.tempCountryData;
		const val = ev.target.value;

		if (val && val.trim() != '') {
			this.countriesData = this.countriesData.filter((item) => {
				return (item.country.toLowerCase().indexOf(val.toLowerCase()) > -1);
			})
		}
	}

	viewDetail(city) {
		this.navCtrl.push(WorldDetailPage, { data: city.value });
	}

	doRefresh(refresher) {
		this.getCoronaData(refresher);
	}
}
