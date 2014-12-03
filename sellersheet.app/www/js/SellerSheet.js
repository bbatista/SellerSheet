/* Seller Sheet*/
function SellerSheet() {

	// check for the support of local storage feature
	if (typeof(Storage) === "undefined")
		throw "Local Storage not supported";
		
	this.data = null;
}

// function to start the sheet
SellerSheet.prototype.initialize = function(normalTarget, bestTarget, startDay, totalDays, daysOff) {

	// calculate the targets
	var calculator = new SheetCalculator(normalTarget, bestTarget, startDay, totalDays, daysOff);
	this.data = calculator.getSheetData();
}

// set the sold value of the day and reconfigure the missing fields
SellerSheet.prototype.setSoldValue = function(day, value) {
		
	this.data.targets[day].value = value;
	this._recalculate(day+1);
}

// save data in the local storage
SellerSheet.prototype.saveData = function() {
	if (this.data != null)
		localStorage.setItem("seller_sheet", JSON.stringify(this.data));
}

// load data from the local storage
SellerSheet.prototype.loadData = function() {
	var dataString = localStorage.getItem("seller_sheet");
	if (dataString != "") {
		this.data = JSON.parse(dataString);
	}
}

SellerSheet.prototype._recalculate = function(fromDay) {

	var totalSold = 0;
	var passedDays = [];
	
	// first, calculate the already sold amount
	for (var day = fromDay;day<this.data.totalDays;day++) {
		totalSold += parseInt(this.data.targets[day].sold);
	}
	
	// calculates the rest of the week
	var calculator = new SheetCalculator(parseInt(this.data.normalTarget)-totalSold,
		   								parseInt(this.data.bestTarget)-totalSold,
										this.data.targets[fromDay].date, this.data.totalDays - (fromDay+1), []); //TODO: recalculate with the days off
	var newSheet = calculator.getSheetData();
	
	//redistribute the values
	var i = 0;
	for (var day = fromDay;day<this.data.totalDays;day++) {
		this.data.targets[day] = newSheet.targets[i];
		i++;
	}
}
