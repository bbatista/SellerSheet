var sheet = new SellerSheet();
var weekInfo = {};
var targets = [];
var currentDaySetup;
	

function main() {

	// try to load from the localStorage
	sheet.loadData();
	updateData();
}

function startWeek() {

		var normalTarget = parseInt($("#normalTarget").val());
		var bestTarget = parseInt($("#bestTarget").val());
		var startDay = createDate($("#startDate").val());
		var totalDays = longPeriodCtrl.isChecked() ? 15 : 7;
		sheet.initialize(normalTarget, bestTarget, startDay, totalDays, []);
		updateData();
		sheet.saveData();
		tabCtrl.setActiveTab(0,{animation:'slide'});
	}
	
	function updateData() {

		if (sheet.data != null) {

			// set week Info
			this.weekInfo.normalTarget = sheet.data.normalTarget;
			this.weekInfo.bestTarget = sheet.data.bestTarget;
			this.weekInfo.longPeriod = sheet.data.totalDays == 15;
			this.weekInfo.startDate = formatDate(sheet.data.startDay);

			// set daily info
			this.targets = sheet.data.targets;
		} 
	}

	function setSoldDay(day, value) {
		sheet.setSoldValue(day, value);
		updateData();
		sheet.saveDate();
	}
	
	
	function setDay(value){
	
		sheet.setSoldValue(currentDaySetup, value);
		updateData();
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
		
	main();
	ons.bootstrap()
	.controller("listController", function ($scope ) {
		$scope.targets = targets;
		if (targets == undefined || targets.length == 0) {
			tabCtrl.setActiveTab(1,{animation:'slide'});
		}
	})
	.controller("weekSetupController", function ($scope, $rootScope) {
		if (weekInfo.startDate) {
			$scope.weekInfo = weekInfo;
			$("#startDate").val(weekInfo.startDate);
		}
	});

