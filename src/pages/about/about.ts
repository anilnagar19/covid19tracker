import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'page-about',
	templateUrl: 'about.html'
})
export class AboutPage {
	countriesData: any = [];
	tempCountryData: any = [];

	constructor(public navCtrl: NavController, private http: HttpClient) {
		this.getWorldData().subscribe((res: any) => {

			let Filtereddata = [];

			this.filterData(res.data).then((res) => {
				Object.keys(res).forEach((key) => {
					var totalConfirmed = res[key].value.reduce(function (prev, cur) {
						return prev + cur.Confirmed;
					}, 0);
					var totalRecovered = res[key].value.reduce(function (prev, cur) {
						return prev + cur.Recovered;
					}, 0);
					var totalDeath = res[key].value.reduce(function (prev, cur) {
						return prev + cur.Deaths;
					}, 0);

					res[key].totalDeath = totalDeath;
					res[key].totalConfirmed = totalConfirmed;
					res[key].totalRecovered = totalRecovered;

					Filtereddata.push(res[key]);
					this.countriesData = Filtereddata;
					this.tempCountryData = Filtereddata;
				});
			});

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

}
