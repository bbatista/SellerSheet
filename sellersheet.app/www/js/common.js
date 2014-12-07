/* File for common functions*/

// instanciates new date
function createDate(dateString) {
	return new Date(dateString + "T12:00:00");
}

function formatDate(dt, fullDate) {
	var day = dt.getDay() < 10 ? "0" + dt.getDay() : dt.getDay();
	var month = parseInt(dt.getMonth()+1);
	var time = fullDate == true ? "T12:00:00" : "";
	return dt.getFullYear() + "-" + month + "-" + day + time;
}

