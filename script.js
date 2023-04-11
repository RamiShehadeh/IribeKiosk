
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabs = document.querySelectorAll('.tab');
    const homeImage = document.getElementById('testudo');

    // Add a click event listener to the image element and buttons
    homeImage.addEventListener('click', function() {
      // play sound
      playButtonClickSound();
      const target = homeImage.getAttribute('data-target');

      // Deactivate all buttons and tabs
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabs.forEach(tab => tab.classList.remove('active'));

      // Activate the clicked button and its corresponding tab
      homeImage.classList.add('active');
      document.getElementById(target).classList.add('active');
    });
  
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        // play sound
        playButtonClickSound();
        const target = button.getAttribute('data-target');
  
        // Deactivate all buttons and tabs
        homeImage.classList.remove('active');
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabs.forEach(tab => tab.classList.remove('active'));
  
        // Activate the clicked button and its corresponding tab
        button.classList.add('active');
        document.getElementById(target).classList.add('active');
      });
    });
  
    // Set the home active by default
    //tabButtons[5].click();

    tabButtons[3].click();

  
    // Load the content of each tab from separate HTML files
    $("#alerts").load("tab0.html");
    $("#building-map").load("tab1.html");
    $("#campus-map").load("tab2.html");
    $("#campus-info").load("tab3.html");
    $("#event-calendar").load("tab4.html", async function() {
      // Initialize the calendar
      const events = await fetchEvents();
      initializeCalendar(events);
      displayUpcomingEvents(events);
    });
    $("#faq").load("tab5.html");
    $("#home").load("home.html");
    // Load additional tab content as needed

});

// Play sound when button pressed
function playButtonClickSound() {
  const sound = document.getElementById('button-click-sound');
  sound.currentTime = 0;
  sound.play();
}

function initializeCalendar(events) {
  $('#calendar').fullCalendar({
    events: events,
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    },
    defaultView: 'month',
    eventClick: function (calEvent, jsEvent, view) {
      closeEventBubble();

      const bubble = document.createElement('div');
      bubble.classList.add('event-bubble');
      bubble.innerHTML = `
          <div class="event-bubble-header">
              <h3>${calEvent.title}</h3>
              <button class="event-bubble-close">&times;</button>
          </div>
          <p> ${calEvent.description} </p>
          <p>Location: ${calEvent.location} </p>
          <p>Start: ${calEvent.start.format('MMMM Do YYYY, h:mm a')}</p>
          <p>End: ${calEvent.end.format('MMMM Do YYYY, h:mm a')}</p>
      `;
      document.body.appendChild(bubble);

      // Calculate the position of the event bubble
      var bubbleWidth = bubble.offsetWidth;
      var bubbleHeight = bubble.offsetHeight;

      var windowWidth = window.innerWidth;
      var windowHeight = window.innerHeight;

      var clickX = jsEvent.pageX;
      var clickY = jsEvent.pageY;

      var posX = clickX + 20;
      var posY = clickY - 10;

      // Check if the bubble goes out of bounds horizontally
      if (posX + bubbleWidth > windowWidth) {
          posX = clickX - bubbleWidth - 20;
      }

      // Check if the bubble goes out of bounds vertically
      if (posY + bubbleHeight > windowHeight) {
          posY = clickY - bubbleHeight - 20;
      }

      bubble.style.left = posX + 'px';
      bubble.style.top = posY + 'px';

      const closeButton = bubble.querySelector('.event-bubble-close');
      closeButton.addEventListener('click', closeEventBubble);
    },
  });
}
/* display upcoming events (events within next month) */
function displayUpcomingEvents(events) {
  const today = new Date();
  const nextMonth = new Date(today);
  nextMonth.setMonth(nextMonth.getMonth() + 1);

  const upcomingEvents = events.filter(event => {
    const eventDate = new Date(event.start);
    return eventDate >= today && eventDate <= nextMonth;
  });

  const list = document.createElement('ul');
  upcomingEvents.forEach(event => {
    const eventDate = new Date(event.start);
    const formattedDate = eventDate.toLocaleDateString();
    const listItem = document.createElement('li');
    listItem.textContent = `${event.title} - ${formattedDate}`;
    list.appendChild(listItem);
  });

  document.getElementById('upcoming-events').appendChild(list);
}



/* Close event bubble for event calendar */
function closeEventBubble() {
  const eventBubble = document.querySelector('.event-bubble');
  if (eventBubble) {
    eventBubble.remove();
  }
}

// fetch events from JSON file 'events.JSON'
function fetchEvents() {
  return fetch('events.json')
    .then(response => response.json())
    .then(events => {
      return events;
    })
    .catch(error => {
      console.error('Error fetching events:', error);
      return [];
    });
}

// Load the content of the alert/notification bar from tab0.html
$(".alerts-container").load("tab0.html .alert, .notification", function() {
  // Initialize the scrolling functionality for the alert/notification bar
  const alertBarContent = $(".alerts-container").html();
  $(".alerts-container").html(alertBarContent + " " + alertBarContent);

  const scrollAlerts = () => {
    $(".alerts-container").animate(
      { scrollLeft: $(".alerts-container").scrollLeft() + 1 },
      30,
      "linear",
      scrollAlerts
    );
  };

  scrollAlerts();
});


