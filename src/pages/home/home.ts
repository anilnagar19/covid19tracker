import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from 'ionic-angular';

import { DistrictPage } from '../district/district';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	loading: any;
	totalCase: any = {};
	districtData: any = [];
	tempStateData: any = [];
	stateWiseData: any = [];

	searchText: string = '';

	constructor(public navCtrl: NavController, private http: HttpClient, private loadingCtrl: LoadingController) { }

	ionViewDidEnter() {
		this.getStateData();
		this.getDistrictData();
	}

	getDistrictData(refresher?) {
		if (!this.loading) {
			this.loading = this.loadingCtrl.create({
				content: 'Loading'
			});
			this.loading.present();
		}
		this.getDistrictWiseData().subscribe((res) => {
			this.districtData = res;
			this.loading.dismiss();
			this.loading = null;
			if (refresher) {
				refresher.complete();
			}
			this.searchText = '';
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
		if (this.districtData[state]) {
			let data = this.districtData[state].districtData;
			this.navCtrl.push(DistrictPage, { data: data });
		}
	}

	doRefresh(refresher) {
		this.getStateData(refresher);
		this.getDistrictData(refresher);
	}
}
