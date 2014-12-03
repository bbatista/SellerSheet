/* Seller Sheet*/
function SellerSheet() {

	// check for the support of local storage feature
	if (typeof(Storage) === "undefined")
		throw "Local Storage not supported";
		
		
	this.weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
	this.data = {};
	this.data.minTarget = 0;
	this.data.bestTarget = 0;
	this.data.daysOff = [];
	
	for(var day = 0; day < this.weekDays.length;day++) {
		this.data[this.weekDays[day]] = {minTarget:0, bestTarget:0, soldValue:0};
	}
}

// function to start the week
SellerSheet.prototype.initialize = function(minTarget, bestTarget, daysOff) {

	
	// set the configuration
	this.data.minTarget = minTarget;
	this.data.bestTarget = bestTarget;
	this.data.daysOff = daysOff;
	
	// calculate the targets
	var calculator = new SheetCalculator(minTarget, bestTarget, daysOff);
	var result = calculator.getSheetData();
	// set the minTarget
	this._setDays("minTarget", result.dailyTargets);
	this._setDays("bestTarget", result.dailyBestTargets);
}

// set the sold value of the day and reconfigure the missing fields
SellerSheet.prototype.setSoldValue = function(day, value) {
	var index = this.weekDays.indexOf(day);
	if (index == -1) throw "Invalid week day name";
	
	this.data[day].soldValue = value;
	this._recalculate(index+1);
}

// save data in the local storage
SellerSheet.prototype.saveData = function() {
	localStorage.setItem("seller_sheet", JSON.stringify(this.data));
}

// load data from the local storage
SellerSheet.prototype.loadData = function() {
	var dataString = localStorage.getItem("seller_sheet");
	if (dataString != "") {
		this.data = JSON.parse(dataString);
	}
}

SellerSheet.prototype._setDays = function(target, targetValues) {
	
		for (var day = 0; day < this.weekDays.length;day++) {
			var dayName = this.weekDays[day];
			if (targetValues[dayName] != undefined)
				this.data[dayName][target] = targetValues[dayName];
//			else
//				this.data[dayName][target] = {};
		}
}

SellerSheet.prototype._recalculate = function(fromDay) {

	var totalSold = 0;
	var passedDays = [];
	
	// first, calculate the already sold amount
	for (var day = 0; day < fromDay;day++) {
		totalSold += parseInt(this.data[this.weekDays[day]].soldValue);
		passedDays.push(day);
	}
	
	// calculates the rest of the week
	var calculator = new SheetCalculator(parseInt(this.data.minTarget)-totalSold, parseInt(this.data.bestTarget)-totalSold, passedDays);
	var newSheet = calculator.getSheetData();
	
	this._setDays("minTarget", newSheet.dailyTargets);
	this._setDays("bestTarget", newSheet.dailyBestTargets);
}