/*Sheet calculator*/

function SheetCalculator(normalTarget, bestTarget, startDay, totalDays, daysOff) {

	// param validations
	if (startDay instanceof Date === false) throw "The param startDay must be of type Date";
	if (daysOff instanceof Array === false)	throw "The param daysOff must be of type Array";

	// constants to help
	this.daysName = ['Domingo', 'Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta', 'Sabado'];
	this.months = ['Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

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
	var currentDate = new Date(this.startDay);
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

SheetCalculator.prototype.getSheetData = function() {

	var targets = [];
	for (var i=0;i<this.totalDays;i++) {
		var target = {};
		target.index = i;
		target.monthDay = this.normalDailyTargets[i].date.getDate();
		target.month = this.months[this.normalDailyTargets[i].date.getMonth()];
		target.day = this.normalDailyTargets[i].day;
		target.date = this.normalDailyTargets[i].date;
		target.date_str = formatDate(this.normalDailyTargets[i].date, true);
		target.normal = this.normalDailyTargets[i].value;
		target.best = this.bestDailyTargets[i].value;
		target.sold = 0;
		targets.push(target);
	}

	return {
			'normalTarget': this.normalTarget,
			'bestTarget': this.bestTarget,
			'totalDays': this.totalDays,
			'startDay': this.startDay,
			'startDay_str': formatDate(this.startDay, true),
			'daysOff': this.daysOff,
			'targets': targets
		};
}
