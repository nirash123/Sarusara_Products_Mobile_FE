<template>
<h2 class="brand-text text-white mb-0">
    <b-img width="60px" src="@/assets/images/logo/slogo.png" alt="logo" />
    T B S Sarusara Products (Time: <span id="currentDateTime"></span>)
</h2>
</template>
<script>
    // Function to update current date and time
    function updateDateTime() {
        var currentDate = new Date();
        var formattedDate = currentDate.toLocaleDateString();
        var formattedTime = currentDate.toLocaleTimeString();
        var dateTimeString = formattedDate + ' ' + formattedTime;

        // Update the content of the span element
        document.getElementById('currentDateTime').textContent = dateTimeString;
    }

    // Update the current date and time initially
    updateDateTime();

    // Update the current date and time every second
    setInterval(updateDateTime, 1000);
</script>