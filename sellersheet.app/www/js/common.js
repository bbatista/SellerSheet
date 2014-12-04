/* File for common functions*/

// instanciates new date
function createDate(dateString) {
	return new Date(dateString + "T12:00:00");
}

function formatDate(dt) {
	var day = dt.getDay() < 10 ? "0" + dt.getDay() : dt.getDay();
	var month = parseInt(dt.getMonth()+1);
	return dt.getFullYear() + "-" + month + "-" + day;
}

