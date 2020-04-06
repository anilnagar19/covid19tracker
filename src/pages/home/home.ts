import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { DistrictPage } from '../district/district';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	stateWiseData: any = [];
	totalCase: any = {};
	tempStateData: any = []
	districtData: any = [];

	constructor(public navCtrl: NavController, private http: HttpClient) {
		this.getStateData();
		this.getDistrictData();
	}

	getDistrictData(refresher?) {
		this.getDistrictWiseData().subscribe((res) => {
			this.districtData = res;
			if (refresher) {
				refresher.complete();
			}
		})
	}

	getStateData(refresher?) {
		this.getStateWiseData().subscribe((res: any) => {
			this.totalCase = res.statewise[0];
			this.stateWiseData = res.statewise;
			this.tempStateData = res.statewise;
			if (refresher) {
				refresher.complete();
			}
		});
	}

	getDistrictWiseData() {
		return this.http.get('https://api.covid19india.org/state_district_wise.json');
	}

	getStateWiseData() {
		return this.http.get('https://api.covid19india.org/data.json');
	}

	getStateSearchData(ev) {
		this.stateWiseData = this.tempStateData;
		const val = ev.target.value;

		if (val && val.trim() != '') {
			this.stateWiseData = this.stateWiseData.filter((item) => {
				return (item.state.toLowerCase().indexOf(val.toLowerCase()) > -1);
			})
		}
	}

	viewDistrict(state) {
		let data = this.districtData[state].districtData;
		this.navCtrl.push(DistrictPage, { data: data });
	}

	doRefresh(refresher) {
		this.getStateData(refresher);
		this.getDistrictData(refresher);
	}
}
