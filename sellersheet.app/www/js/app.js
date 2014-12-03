var sheet = new SellerSheet();
var daysData = [];
var weekInfo = {};
var currentDaySetup;
	
function startWeek(target, bestTarget, daysOff) {
		sheet.initialize(target, bestTarget, daysOff);
		render();
	}
	
	function loadUserData() {
		sheet.loadData();
		render();
	}

	function saveUserData() {
		sheet.saveData();
	}
	
	function render() {
		daysData = [];
		weekInfo = {};
		if (sheet.data != undefined) {
			// set the week information
			weekInfo.minTarget = 10000;
			weekInfo.bestTarget = 15000;
			weekInfo.longPeriod = true;
			var dt = new Date();
			var day = dt.getDay() < 10 ? "0" + dt.getDay() : dt.getDay();
			weekInfo.startDate = dt.getFullYear() + "-" + dt.getMonth() + "-" + day;
			
			// set the days data
			for (var day = 0; day < sheet.weekDays.length;day++) {
				var data = sheet.data[sheet.weekDays[day]];
				daysData.push({ 'index':day,
								'name':sheet.weekDays[day], 
								'target': data.minTarget != undefined ? data.minTarget : 0, 
								'best':data.bestTarget != undefined ? data.bestTarget : 0, 
								'sold':data.soldValue != undefined ? data.soldValue : 0});
			}
		}
	}
	
	function setSoldDay(day, value) {
		sheet.setSoldValue(day, value);
		saveUserData();
		render();
	}
	
	
	function setDay(value){
	
		sheet.setSoldValue(daysData[currentDaySetup].name, value);
		render();
		var scope = angular.element(document.getElementById("dayList")).scope();
		scope.days = daysData;
		scope.$apply();
		nav.popPage();
	}
	

	// ******** Navigation functions

	function showDaySetup(day) {
		currentDaySetup = day;
		if (daysData[day].sold == "")
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
		$scope.days = daysData;
	})
	.controller("weekSetupController", function ($scope, $rootScope) {
		$scope.weekInfo = weekInfo;
		$("#start_date").val(weekInfo.startDate);
	});
