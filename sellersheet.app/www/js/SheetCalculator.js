/*Sheet calculator*/

function SheetCalculator(normalTarget, bestTarget, startDay, totalDays, daysOff) {

	// param validations
	if (startDay instanceof Date === false) throw "The param startDay must be of type Date";
	if (daysOff instanceof Array === false)	throw "The param daysOff must be of type Array";

	// constants to help
	this.daysName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	this.normalTarget = normalTarget;
	this.bestTarget = bestTarget;
	this.startDay = startDay;
	this.totalDays = totalDays;
	this.daysOff = daysOff;
	this.normalDailyTargets = this._calculateDailyTargets(this.normalTarget);
	this.bestDailyTargets = this._calculateDailyTargets(this.bestTarget);
}

SheetCalculator.prototype._calculateDailyTargets = function (target) {

	var targetValues = [];
	var currentDate = this.startDay;
	var proportion = 0;

	// fill the proportion and the days
	for (var i = 0;i<this.totalDays;i++) {
		var day = currentDate.getDay();
		var weight = 0;
		
		//just set weight for working days
		if (this.daysOff.indexOf(i) == -1)
			var weight = (day == 0 || day == 6) ? 3 : 2;

		// include the day in the array
		targetValues.push({'day': this.daysName[day],
							'date': new Date(currentDate),
							'weight': weight
						});

		//increment values
		proportion += weight;
		currentDate.setDate(currentDate.getDate()+1);
	}

	//calculates the proportion
	proportion = target/proportion;	

	// calculates the daily targets
	for (var i = 0;i<this.totalDays;i++) {
		var value = Math.ceil(targetValues[i].weight*proportion);
		targetValues[i].value = value > 0 ? value : 0;
	}

	return targetValues;
}

SheetCalculator.prototype._calculateDailyTargets_deprecated = function(weekTarget, daysOff) {
	
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

	var targets = [];
	for (var i=0;i<this.totalDays;i++) {
		var target = {};
		target.day = this.normalDailyTargets[i].day;
		target.date = this.normalDailyTargets[i].date;
		target.normal = this.normalDailyTargets[i].value;
		target.best = this.bestDailyTargets[i].value;
		targets.push(target);
	}

	return {
			'normalTarget': this.normalTarget,
			'bestTarget': this.bestTarget,
			'totalDays': this.totalDays,
			'startDay': this.startDay,
			'daysOff': this.daysOff,
			'targets': targets
		};
}
