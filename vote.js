document.addEventListener('DOMContentLoaded', function(e) {
    if (!Notification) {
        alert('Desktop notifications not available in your browser. Try Chromium.');
        return;
    }

    if (Notification.permission !== 'granted')
        Notification.requestPermission();
});

button.addEventListener("click", function(e){
    e.preventDefault();

    var selected = document.getElementById("select_votes");
    var selectedVotes = selected.options[selected.selectedIndex].value;

    for (let i = 0; i < selectedVotes; i++) {
        sendRequest();
    }
});

function sendRequest() {
    const req = new XMLHttpRequest();
    const baseUrl = "https://ip1kpysf79.execute-api.us-east-1.amazonaws.com/prod/awards/vote";
    const payload = JSON.stringify({
        awardName: "bestbosses2022",
        category: "Best Bosses",
        firstName: "Neal",
        fullName: "Neal Byrd",
        lastName: "Byrd",
        year: "2022"
    });

    req.open("POST", baseUrl, true);
    req.setRequestHeader("Content-type", "application/json");
    req.send(payload);

    req.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            console.log("You Voted!");
            notifyMe(1);
        }
    }
}

function notifyMe(selectedVotes) {
    if (Notification.permission !== 'granted') {
        Notification.requestPermission();
    } else {
        var notification = new Notification('You Voted!', {
            icon: 'https://cdn-icons-png.flaticon.com/512/1672/1672409.png',
            body: 'Good job! You\'ve voted ' + selectedVotes + ' times!',
        });
        notification.onclick = function() {
            window.open('https://fedscoop.com/best-bosses-in-fed-it/vote/');
        };
    }
};
