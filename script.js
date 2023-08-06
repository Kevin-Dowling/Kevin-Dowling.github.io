
function updateClock() {
    var now = new Date();
    // Get the UTC time in milliseconds
    var utcTime = now.getTime();
    // Calculate the UTC-7 time in milliseconds (7 hours * 60 minutes * 60 seconds * 1000 milliseconds)
    var utcMinusSevenTime = utcTime - (7 * 60 * 60 * 1000);

    var utcMinusSevenDate = new Date(utcMinusSevenTime);

    // Calculate hours for the new system (1 to 100) (ensure leading zeros if needed)
    var newHours = Math.floor((utcMinusSevenDate.getUTCHours() / 24) * 100).toString();
    if (newHours.length < 3) {
        newHours = newHours.padStart(3, '0');
    }

    // Convert minutes to the new system (1 to 100) (ensure leading zeros if needed)
    var newMinutes = Math.floor((utcMinusSevenDate.getUTCMinutes() / 60) * 100).toString().padStart(3, '0');

    // Convert seconds to the new system (1 to 100) (ensure leading zeros if needed)
    var newSeconds = Math.floor((utcMinusSevenDate.getUTCSeconds() / 60) * 100).toString().padStart(3, '0');

    // Format the time in the new system
    var newTime = `${newHours}:${newMinutes}:${newSeconds}`;

    // Update the clock element with the new time
    document.getElementById("clock").innerHTML = newTime;

    // Format the date as "DD/MM/YYYY"
    var day = utcMinusSevenDate.getUTCDate();
    var month = utcMinusSevenDate.getUTCMonth() + 1; // Months are zero-based
    var year = utcMinusSevenDate.getUTCFullYear();
    var formattedDate = `${month}/${day}/${year}`;

    // Update the date element with the new date
    document.getElementById("date").innerHTML = formattedDate;
}

// Update the clock every second
setInterval(updateClock, 1000);


