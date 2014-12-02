/*Sheet calculator*/

function SheetCalculator(targetPrice, bestTargetPrice, daysOff) {
	this.targetPrice = targetPrice;
	this.bestTargetPrice = bestTargetPrice;
	this.daysOff = daysOff;
	this.dailyTargets = this._calculateDailyTargets(targetPrice, daysOff);
	this.bestDailyTargets = this._calculateDailyTargets(bestTargetPrice, daysOff);
}

SheetCalculator.prototype._calculateDailyTargets = function(weekTarget, daysOff) {
	
	if (daysOff instanceof Array === false)	throw "The param daysOff must be of type Array";
	
	var daysName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	var dayWeight = [3,2,2,2,2,2,3]; // proportion of each day
	var daysToWork = 7 - daysOff.length;
	var dailyTarget = {};
	
	var proportion = 0;
	// for each day in the week
	for (var day = 0;day<7;day++) {
		if (daysOff.indexOf(day) == -1) { // if is not a day off
			proportion += dayWeight[day];
		}
	}
	proportion = weekTarget/proportion;
	
	for (var day = 0;day<7;day++) {
		if (daysOff.indexOf(day) == -1 ) { // if is not a day off
			var value = Math.ceil(dayWeight[day]*proportion);
			dailyTarget[daysName[day]] = value > 0 ? value : 0;
		}
	}
	return dailyTarget;
}

SheetCalculator.prototype.getSheetData = function() {
	return {
			targetPrice: this.targetPrice,
			bestTargetPrice: this.bestTargetPrice,
			dailyTargets: this.dailyTargets,
			dailyBestTargets: this.bestDailyTargets
		};
}