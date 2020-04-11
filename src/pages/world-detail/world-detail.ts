import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the WorldDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-world-detail',
	templateUrl: 'world-detail.html',
})
export class WorldDetailPage {
	stateData: any = [];
	tempStateData: any = [];

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.stateData = navParams.get('data');
		this.tempStateData = this.stateData;
	}

	getStateSearchData(ev) {
		this.stateData = this.tempStateData;
		const val = ev.target.value;

		if (val && val.trim() != '') {
			this.stateData = this.stateData.filter((item) => {
				return (item.Province_State.toLowerCase().indexOf(val.toLowerCase()) > -1);
			})
		}
	}

}
