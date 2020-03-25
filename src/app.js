const _ = require('lodash');
const axios = require('axios');
const Vue = require('vue');

let app = new Vue({
	el: '#app',
	beforeCreate() {
	},
	created() {
	},
	mounted() {
		this.getStates();
		this.getCaCount();
		this.getHkCount();
		this.getItalyCount();
		this.getJapanCount();
		this.getLACount();
	},
	methods: {
		getLACount: function() {
			axios.get('https://corona.lmao.ninja/jhucsse')
				 .then(response => (this.la = _.find(response.data, function(o) { return o.city == 'Los Angeles'; } ).stats ))
				 .catch(error => console.log(error));
		},
		getStates: function() {
			axios.get('https://corona.lmao.ninja/countries/usa')
				.then(response => (this.usa = response.data))
				.catch(error => console.log(error))
		},
		getCaCount: function() {
			axios.get('https://corona.lmao.ninja/states')
				.then(response => (this.ca = this.parseCaCount(response.data)))
				.catch(error => console.log(error))

		},
		getHkCount: function() {
			axios.get('https://corona.lmao.ninja/countries/Hong%20Kong')
				.then(response => (this.hk = this.parseLamoCount(response.data)))
				.catch(error => console.log(error))
		},
		getItalyCount: function() {
			axios.get('https://corona.lmao.ninja/countries/Italy')
				.then(response => (this.italy = this.parseLamoCount(response.data)))
				.catch(error => console.log(error))
		},
		getJapanCount: function() {
			axios.get('https://corona.lmao.ninja/countries/Japan')
				.then(response => (this.japan = this.parseLamoCount(response.data)))
				.catch(error => console.log(error))
		},
		parseLamoCount: function(data) {
			return data;
		},
		parseCaCount: function(data, filter) {
			return _.find(data, function(o) {
				return o.state == 'California'; 
			}); 
		},
		parseCityCount: function(data) {
			return _.find(data, function(o) {
				return o.city == 'Los Angeles';
			})
		}
	},
	data: {
		states: '',
		ca: {},
		usa: {},
		hk: {},
		italy: {},
		japan: {},
		la: {},
		jhuData: '',
	},
	filters: {
		formatNumber: function(value) {
			return Number(value).toLocaleString();
		}
	}
})