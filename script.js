
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabs = document.querySelectorAll('.tab');
    const homeImage = document.getElementById('testudo');

    // Add a click event listener to the image element and buttons
    homeImage.addEventListener('click', function() {
      
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

    homeImage.click();

  
    // Initialize the calendar
    initializeCalendar();
    displayUpcomingEvents(events);

    // Load the content of each tab from separate HTML files
    $("#alerts").load("tab0.html");
    $("#building-map").load("tab1.html");
    $("#campus-map").load("tab2.html");
    $("#campus-info").load("tab3.html");
    //$("#event-calendar").load("tab4.html");
    $("#faq").load("tab5.html");
    $("#home").load("home.html");
    // Load additional tab content as needed


    
});

/* initialize event calendar */
const events = [
  {
    title: 'Annual Concrete Eating Event',
    start: '2023-04-05T10:00:00',
    end: '2023-04-05T12:00:00',
    location: 'Room 0101',
    description: 'Join us in devouring these cinder blocks for a chance to win a $10 Starbucks giftcard!'
  },
  {
    title: 'Free Boba Tea',
    start: '2023-04-12T14:00:00',
    end: '2023-04-12T16:00:00',
    location: 'Room 0203',
    description: 'Taro flavor only'
  },
  {
    title: 'Career Fair',
    start: '2023-04-15T18:00:00',
    end: '2023-04-15T20:00:00',
    location: 'Room 0420',
    description: 'get a job? in this economy?'
  },
  {
    title: 'National Cheeseburger Day',
    start: '2023-05-15T18:00:00',
    end: '2023-05-15T20:00:00',
    location: 'The United States',
    description: 'Religious Holiday'
  }
  // Add more events as needed
];

function initializeCalendar() {
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
/* display upcoming events (within next month) */
function displayUpcomingEvents(events) {
  const today = new Date();
  const nextMonth = new Date(today);
  nextMonth.setMonth(nextMonth.getMonth() + 1);

  const upcomingEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate >= today && eventDate <= nextMonth;
  });

  const list = document.createElement('ul');
  upcomingEvents.forEach(event => {
    const listItem = document.createElement('li');
    listItem.textContent = `${event.title} - ${event.date}`;
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


