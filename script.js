document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabs = document.querySelectorAll('.tab');
  
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const target = button.getAttribute('data-target');
  
        // Deactivate all buttons and tabs
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabs.forEach(tab => tab.classList.remove('active'));
  
        // Activate the clicked button and its corresponding tab
        button.classList.add('active');
        document.getElementById(target).classList.add('active');
      });
    });
  
    // Set the first tab active by default
    tabButtons[0].click();
  
    // Initialize the calendar
    $('#calendar').fullCalendar({
      events: [
        {
          title: 'Event 1',
          start: '2023-04-10T10:00:00',
          end: '2023-04-10T12:00:00'
        },
        {
          title: 'Event 2',
          start: '2023-04-12T14:00:00',
          end: '2023-04-12T16:00:00'
        },
        {
          title: 'Event 3',
          start: '2023-04-15T18:00:00',
          end: '2023-04-15T20:00:00'
        }
        // Add more events as needed
      ],
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      defaultView: 'month'
    });

    // Load the content of each tab from separate HTML files
    $("#alerts").load("tab0.html");
    $("#building-map").load("tab1.html");
    $("#campus-map").load("tab2.html");
    $("#campus-info").load("tab3.html");
    $("#faq").load("tab5.html");
    // Load additional tab content as needed

    // Show the first tab by default
    tabButtons[0].click();
    
});