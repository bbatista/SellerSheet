var sheet = new SellerSheet();
var weekInfo = {};
var targets = [];
var currentDaySetup;
	

function main() {

	// try to load from the localStorage
	sheet.loadData();
	render();
}

function startWeek() {

		var normalTarget = parseInt($("#normalTarget").val());
		var bestTarget = parseInt($("#bestTarget").val());
		var startDay = new Date($("#startDate").val() + " 00:00:00");
		var totalDays = longPeriodCtrl.isChecked() ? 15 : 7;
		sheet.initialize(normalTarget, bestTarget, startDay, totalDays, []);
		render();
		tabCtrl.setActiveTab(0,{animation:'slide'});
	}
	
	function render() {

		if (sheet.data != null) {

			// set week Info
			this.weekInfo.normalTarget = sheet.data.normalTarget;
			this.weekInfo.bestTarget = sheet.data.bestTarget;
			this.weekInfo.longPeriod = sheet.data.totalDays == 15;
			this.weekInfo.startDate = formatDate(new Date(sheet.data.startDay));

			// set daily info
			this.targets = sheet.data.targets;
		} 
	}

	function formatDate(dt) {
		var day = dt.getDay() < 10 ? "0" + dt.getDay() : dt.getDay();
		return dt.getFullYear() + "-" + dt.getMonth() + "-" + day;
	}

	function setSoldDay(day, value) {
		sheet.setSoldValue(day, value);
		render();
		sheet.saveDate();
	}
	
	
	function setDay(value){
	
		sheet.setSoldValue(currentDaySetup, value);
		render();
		var scope = angular.element(document.getElementById("dayList")).scope();
		scope.targets = this.targets;
		scope.$apply();
		nav.popPage();
	}
	

	// ******** Navigation functions

	function showDaySetup(day) {
		currentDaySetup = day;
		if (targets[day].sold == "")
			nav.pushPage("day_setup", {animation: 'slide'});
	}
	
	function goBack() {
		if (nav.getPages().length > 1)
			nav.popPage();
	}
	
	// ******** Interface configurations ( bootstrap, controllers )
	$(document).on('ons-switch:init', '#days_period', function(event) {
		event.target.checked = weekInfo.longPeriod;
	});
		
	ons.bootstrap()
	.controller("listController", function ($scope ) {
		$scope.targets = targets;
		if (targets == undefined || targets.length == 0) {
			tabCtrl.setActiveTab(1,{animation:'slide'});
		}
	})
	.controller("weekSetupController", function ($scope, $rootScope) {
		$scope.weekInfo = weekInfo;
		$("#start_date").val(weekInfo.startDate);
	});

main();
