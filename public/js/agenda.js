$(document).ready(function() {
    
    var all = [
        {
            title: 'CWA Commencement Ceremony',
            start: '2018-10-01',
            color: 'blue'
        },
        {
            title: 'Cardi Expo',
            start: '2018-10-01T09:00:00',
            end: '2018-10-01T12:00:00',
            color: 'blue'
        },
        {
            title: 'Executive Director Speech',
            start: '2018-10-06T16:00:00',
            end: '2018-10-06T18:00:00',
            color: 'blue'
        },
        {
            title: 'Executive Director Speech 2',
            start: '2018-10-06T16:00:00',
            end: '2018-10-06T18:00:00',
            color: 'blue'
        },
        {
            title: 'Closing Remarks',
            start: '2018-10-05T12:00:00', 
            end: '2018-10-05T12:15:00',
            color: 'blue'
        },
        {
            title: 'Hackathon', 
            start: '2018-09-30T09:00:00',
            end: '2018-10-06T16:00:00',
            color: 'red'
        },
        {
            title: 'Parliament Meeting',
            start: '2018-10-03T10:00:00',
            end: '2018-10-03T02:00:00',
            color: 'purple'
        },
        {
            title: 'Coconut Seminar',
            start: '2018-10-03T10:00:00',
            end: '2018-10-03T02:00:00',
            color: 'green'
        }, 
        {
            title: 'Workplace Safety',
            start: '2018-10-03T10:00:00',
            end: '2018-10-03T02:00:00',
            color: 'orange'
        }, 
        {
            title: 'Agricultural Toys',
            start: '2018-10-03T10:00:00',
            end: '2018-10-03T02:00:00',
            color: 'yellow'
        }
    ]; 

    var techies = []; 
    var govt = []; 
    var farmers = []; 
    var hr = [];
    var kids = []; 

    // techies.push(all.filter((x) => (x.color === "red"))); // Changes need to be made to use asynchronous method
    
    for (var i = 0; i < all.length; i += 1) {
        if (all[i].color === 'red')
            techies.push(all[i]); 
        else if (all[i].color === 'purple')
            govt.push(all[i]);
        else if (all[i].color === 'green')
            farmers.push(all[i]); 
        else if (all[i].color === 'orange')
            hr.push(all[i]); 
        else if (all[i].color === 'yellow')
            kids.push(all[i]); 
    }

    console.log(techies); 
    console.log(farmers); 
    console.log(kids); 

    /* KEY:
    blue: all
    red: techies
    purple: government officials
    */

    $('#all').fullCalendar({
        header: {
            left: 'prev,next today',  
            center: 'title',
            right: 'month,agendaWeek,agendaDay,listWeek' //month,
        },
        defaultView: 'listWeek',
        defaultDate: '2018-10-01', // 1st of October
        navLinks: true, // can click day/week names to navigate views
        editable: false,
        eventLimit: true, // allow "more" link when too many events
        events: all,
    });

    $('#techies').fullCalendar({
        header: {
            left: 'prev,next today',  
            center: 'title',
            right: 'month,agendaWeek,agendaDay,listWeek' //month,
        },
        height: 2000,
        defaultView: 'listWeek',
        defaultDate: '2018-10-01', // 1st of October
        navLinks: true, // can click day/week names to navigate views
        editable: false,
        eventLimit: true, // allow "more" link when too many events
        events: techies,
    });

    $('#hr').fullCalendar({
        header: {
            left: 'prev,next today',  
            center: 'title',
            right: 'month,agendaWeek,agendaDay,listWeek' //month,
        },
        height: 2000,
        defaultView: 'listWeek',
        defaultDate: '2018-10-01', // 1st of October
        navLinks: true, // can click day/week names to navigate views
        editable: false,
        eventLimit: true, // allow "more" link when too many events
        events: hr,
    });

    $('#kids').fullCalendar({
        header: {
            left: 'prev,next today',  
            center: 'title',
            right: 'month,agendaWeek,agendaDay,listWeek' //month,
        },
        height: 2000,
        defaultView: 'listWeek',
        defaultDate: '2018-10-01', // 1st of October
        navLinks: true, // can click day/week names to navigate views
        editable: false,
        eventLimit: true, // allow "more" link when too many events
        events: kids,
    });

    $('#govt').fullCalendar({
        header: {
            left: 'prev,next today',  
            center: 'title',
            right: 'month,agendaWeek,agendaDay,listWeek' //month,
        },
        defaultView: 'listWeek',
        defaultDate: '2018-10-01', // 1st of October
        navLinks: true, // can click day/week names to navigate views
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        events: govt,
    });

    $('#farmers').fullCalendar({
        header: {
            left: 'prev,next today',  
            center: 'title',
            right: 'month,agendaWeek,agendaDay,listWeek' //month,
        },
        height: 2000,
        defaultView: 'listWeek',
        defaultDate: '2018-10-01', // 1st of October
        navLinks: true, // can click day/week names to navigate views
        editable: false,
        eventLimit: true, // allow "more" link when too many events
        events: farmers,
    });

    console.log(document.getElementById('all'));
});

/* DOCUMENTATION AVAILABLE AT: https://fullcalendar.io/docs/ */