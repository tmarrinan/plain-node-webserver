Date.prototype.monthDays= function(){
    var d= new Date(this.getFullYear(), this.getMonth()+1, 0);
    return d.getDate();
}

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var current_date;

function init() {
    var calendar = document.getElementById("calendar");
    calendar.addEventListener("click", selectDate, false);

    current_date = new Date();
    current_date.setDate(1);
    populateCalendar(current_date.getMonth(), current_date.getFullYear());
}

function populateCalendar(month, year) {
    var date = new Date(year, month, 1);

    var month = document.getElementById("month");
    month.textContent = months[date.getMonth()] + ", " + date.getFullYear();
    var first_day = date.getDay()
    var days_in_month = date.monthDays();

    var i, j;
    var cell;
    var cell_date;
    var cell_month;
    for (i=0; i<6; i++) {
        for (j=0; j<7; j++) {
            cell = document.getElementById("cell_" + i + "." + j);
            if ((i === 0 && j < first_day) || (7*i + j >= first_day + days_in_month)){
                cell.textContent = "";
                cell.dateAsString = "";
            }
            else {
                cell_date = (7*i + j - first_day + 1).toString();
                if (cell_date.length === 1) {
                    cell_date = "0" + cell_date;
                }
                cell.textContent = cell_date;
                cell_month = (date.getMonth() + 1).toString();
                if (cell_month.length === 1) {
                    cell_month = "0" + cell_month;
                }
                cell.dateAsString = cell_month + "/" + cell_date + "/" + date.getFullYear();
            }
        }
    }
}

function selectDate(event) {
    if (event.target.id === "prev_month") {
        current_date.setMonth(current_date.getMonth() - 1);
        populateCalendar(current_date.getMonth(), current_date.getFullYear());
    }
    else if (event.target.id === "next_month") {
        current_date.setMonth(current_date.getMonth() + 1);
        populateCalendar(current_date.getMonth(), current_date.getFullYear());
    }
    else if (event.target.id.substring(0, 5) === "cell_") {
        console.log("select date: " + event.target.dateAsString);
    }
}