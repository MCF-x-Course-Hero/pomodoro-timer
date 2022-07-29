//https://stackoverflow.com/questions/11591854/format-date-to-mm-dd-yyyy-in-javascript

function getFormattedDate(date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    let day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return month + '/' + day + '/' + year;
}

module.exports = {
    getFormattedDate
}