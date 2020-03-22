const _ = require('lodash');
const axios = require('axios');
const Vue = require('vue');

let app = new Vue({
	el: '#app',
	beforeCreate() {
	},
	created() {
	},
	beforeMount() {
		this.getStates();
		this.getCaCount();
		this.getHkCount();
	},
	methods: {
		getStates: function() {
			axios .get('https://covidtracking.com/api/us')
				.then(response => (this.usa = response.data[0]))
				.catch(error => console.log(error))
		},
		getCaCount: function() {
			axios .get('https://covidtracking.com/api/states/daily')
				.then(response => (this.ca = this.parseCount(response.data, 'CA')))
				.catch(error => console.log(error))

		},
		getHkCount: function() {
			axios.get('https://corona.lmao.ninja/jhucsse')
				.then(response => (this.hk = this.parseLamoCount(response.data, 'Hong Kong')))
				.catch(error => console.log(error))
		},
		parseLamoCount: function(data, filter) {
			return _.find(data, function(o) {
				return o.province == 'Hong Kong';
			})
		},
		parseCount: function(data, filter) {
			return _.find(data, function(o) {
				return o.state == filter; 
			}); 
		}
	},
	data: {
		states: '',
		ca: {},
		usa: {},
		hk: {'stats': {}}
	},
	filters: {
		formatNumber: function(value) {
			return Number(value).toLocaleString();
		}
	}
})