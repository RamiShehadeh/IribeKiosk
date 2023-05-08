
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const homeButton = document.querySelectorAll('.home-button');
    const tabs = document.querySelectorAll('.tab');
    // const homeImage = document.getElementById('testudo');

    // // Add a click event listener to the image element and buttons
    // homeImage.addEventListener('click', function() {
    //   // play sound
    //   playButtonClickSound();
    //   const target = homeImage.getAttribute('data-target');

    //   // Deactivate all buttons and tabs
    //   tabButtons.forEach(btn => btn.classList.remove('active'));
    //   tabs.forEach(tab => tab.classList.remove('active'));

    //   // Activate the clicked button and its corresponding tab
    //   homeImage.classList.add('active');
    //   document.getElementById(target).classList.add('active');
    // });
  
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        // play sound
        playButtonClickSound();
        const target = button.getAttribute('data-target');
  
        // Deactivate all buttons and tabs
        // homeImage.classList.remove('active');
        homeButton.forEach(btn => btn.classList.remove('active'));
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabs.forEach(tab => tab.classList.remove('active'));
  
        // Activate the clicked button and its corresponding tab
        button.classList.add('active');
        document.getElementById(target).classList.add('active');
      });
    });

    homeButton.forEach(button => {
      button.addEventListener('click', () => {
        // play sound
        playButtonClickSound();
        const target = button.getAttribute('data-target');
  
        // Deactivate all buttons and tabs
        // homeImage.classList.remove('active');
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabs.forEach(tab => tab.classList.remove('active'));
  
        // Activate the clicked button and its corresponding tab
        button.classList.add('active');
        document.getElementById(target).classList.add('active');
      });
    });
  
    // Set the home active by default
    //tabButtons[5].click();

    // tabButtons[3].click();
    homeButton[0].click();
  
    // Load the content of each tab from separate HTML files
    $("#alerts").load("tabs/tab0.html");
    $("#building-map").load("tabs/tab1.html");
    $("#campus-map").load("tabs/tab2.html");
    $("#hours").load("tabs/tab3.html");
    $("#about").load("tabs/tab5.html");
    

    // Initialize the calendar
  //   (async function() {
  //     const events = await fetchEvents();
  //     initializeCalendar(events);
  //     displayUpcomingEvents(events);
  // })();

  const accessibilityButton = document.querySelector('.accessibility-button');
  const accessibilityBackButton = document.querySelector('.accessibility-back-button');
  const accessibilityOptions = document.querySelector('.accessibility-options');
  const originalMenuButtons = document.querySelectorAll('.vertical-menu-right .tab-button');

  accessibilityButton.addEventListener('click', () => {
      // Hide the original menu buttons and show the accessibility options
      originalMenuButtons.forEach(button => button.style.display = 'none');
      accessibilityButton.style.display = 'none';
      accessibilityOptions.style.display = 'block';
      accessibilityBackButton.style.display = 'block';
  });

  accessibilityBackButton.addEventListener('click', () => {
      // Hide the accessibility options and back button, and show the original menu buttons
      originalMenuButtons.forEach(button => button.style.display = 'block');
      accessibilityOptions.style.display = 'none';
      accessibilityBackButton.style.display = 'none';
      accessibilityButton.style.display = 'block';
  });

  $(document).ready(function() {
    // When clicking anywhere outside the menu
    $(document).click(function(event) {
        if (!$(event.target).closest('.vertical-menu-right').length) {
            $('.accessibility-options').hide();
            $('.accessibility-back-button').hide();
            $('.accessibility-button').show();
            $('.tab-button').show();
        }
    });

    // When switching to another tab
    $('.tab-button').click(function() {
        $('.accessibility-options').hide();
        $('.accessibility-back-button').hide();
        $('.accessibility-button').show();
        $('.tab-button').show();
    });
});

  // Load the content of the alert/notification bar from tab0.html
  document.querySelector(".alerts-container").innerHTML = document.querySelector("#tab0-template .alert, #tab0-template .notification").innerHTML;

});

// Play sound when button pressed
function playButtonClickSound() {
  const sound = document.getElementById('button-click-sound');
  sound.currentTime = 0;
  sound.play();
}

// function initializeCalendar(events) {
//   $('#calendar').fullCalendar({
//     events: events,
//     header: {
//       left: 'prev,next today',
//       center: 'title',
//       right: 'month,agendaWeek,agendaDay'
//     },
//     defaultView: 'month',
//     eventClick: function (calEvent, jsEvent, view) {
//       closeEventBubble();

//       const bubble = document.createElement('div');
//       bubble.classList.add('event-bubble');
//       bubble.innerHTML = `
//           <div class="event-bubble-header">
//               <h3>${calEvent.title}</h3>
//               <button class="event-bubble-close">&times;</button>
//           </div>
//           <p> ${calEvent.description} </p>
//           <p>Location: ${calEvent.location} </p>
//           <p>Start: ${calEvent.start.format('MMMM Do YYYY, h:mm a')}</p>
//           <p>End: ${calEvent.end.format('MMMM Do YYYY, h:mm a')}</p>
//       `;
//       document.body.appendChild(bubble);

//       // Calculate the position of the event bubble
//       var bubbleWidth = bubble.offsetWidth;
//       var bubbleHeight = bubble.offsetHeight;

//       var windowWidth = window.innerWidth;
//       var windowHeight = window.innerHeight;

//       var clickX = jsEvent.pageX;
//       var clickY = jsEvent.pageY;

//       var posX = clickX + 20;
//       var posY = clickY - 10;

//       // Check if the bubble goes out of bounds horizontally
//       if (posX + bubbleWidth > windowWidth) {
//           posX = clickX - bubbleWidth - 20;
//       }

//       // Check if the bubble goes out of bounds vertically
//       if (posY + bubbleHeight > windowHeight) {
//           posY = clickY - bubbleHeight - 20;
//       }

//       bubble.style.left = posX + 'px';
//       bubble.style.top = posY + 'px';

//       const closeButton = bubble.querySelector('.event-bubble-close');
//       closeButton.addEventListener('click', closeEventBubble);
//     },
//   });
// }

function initializeCalendar(events) {
  const calendarEl = document.getElementById('calendar');
  const calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: ['interaction', 'dayGrid', 'timeGrid'],
    events: events,
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    defaultView: 'dayGridMonth',
    eventClick: function (info) {
      const calEvent = info.event;
      const jsEvent = info.jsEvent;

      closeEventBubble();

      const bubble = document.createElement('div');
      bubble.classList.add('event-bubble');
      bubble.innerHTML = `
          <div class="event-bubble-header">
              <h3>${calEvent.title}</h3>
              <button class="event-bubble-close">&times;</button>
          </div>
          <p> ${calEvent.extendedProps.description} </p>
          <p>Location: ${calEvent.extendedProps.location} </p>
          <p>Start: ${calEvent.start.toLocaleString()}</p>
          <p>End: ${calEvent.end.toLocaleString()}</p>
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
    }
  });
  calendar.render();
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


