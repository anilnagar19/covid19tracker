import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DistrictPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-district',
	templateUrl: 'district.html',
})
export class DistrictPage {
	districtData: any = [];
	tempDistrictData: any = [];

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		let districtData = navParams.get('data');

		Object.keys(districtData).map((res) => {
			districtData[res].city = res;
			this.districtData.push(districtData[res])
		});

		this.tempDistrictData = this.districtData;
	}

	getDistrictSearchData(ev) {
		this.districtData = this.tempDistrictData;

		const val = ev.target.value;

		if (val && val.trim() != '') {
			this.districtData = this.districtData.filter((item) => {
				return (item.city.toLowerCase().indexOf(val.toLowerCase()) > -1);
			})
		}
	}
}
