# Coach Tracker - Project Two (GA)

This project was completed during Week 7 of the Software Engineering Immersive Course. The current focus was Fullstack Development and the goal of the project was to produce a Front and Backend for a site that would allow for CRUD Operations making use of the MEVN stack (MongoDB, Express, Vue.js & Node.js). I created a basic site for Coaches to be able to manage and track bookings/sessions with their athletes.

![coach-tracker](https://i.imgur.com/zMA7EkP.png)

## Deployment

The project was deployed using Netlify and is available [here](https://warm-trifle-440ea1.netlify.app/)

## Getting started

This project is separated into two separate repositories

- [Frontend](https://github.com/alfphiee/Unit_2_Project_Frontend)
- Backend (This repo)

To run the backend:

1. Clone this repository
2. In CLI run `npm i` on the root folder to install the required dependencies
3. Next in the CLI run `node server.js` to run the backend in your local environment
   (Due to the lack of .env file you will likely face errors running due to no MongoDB connection)

## Timeframe & Working Team

This was a solo project with a window of 4.5 days to complete the project and have it ready for presentation.

## Technologies Used

- MongoDB
- Express.js
- Vue.js
- Node.js
- JavaScript
- OAuth

## Brief

Create an App that:

- Has at least 2 data entities (data resources) in addition to the User Model - one entity that represents the main functional idea for your app and another with a One:Many or Many:Many relationship with that main entity (embedded or referenced).
- Use OAuth authentication.
- Implements basic authorization that restricts access to features that need a logged-in user to work (typically CUD data operations) by "protecting" those routes from anonymous users using the ensureLoggedIn middleware from the OAuth lesson. In addition, ensure that editing and deletion of a data resource can only be done by the user that created that data (this is done in the controller - refer to the Guide to User-Centric CRUD).
- Have full CRUD data operations somewhere within the app's features. For example, you can have functionality that Creates & Updates a post and satisfy Delete functionality by implementing the ability to delete comments.
- Is styled such that the app looks and feels similar to apps we use daily - in other words, it should have a consistent and polished user interface.
- Is deployed online

## Planning

Initially, I created an ERD for the data entities I would be using:

![ERD-diagram](https://imgur.com/LqpPOo7.png)

I then used Trello to create some User Stories for some of the features I wanted. I created swimlanes to keep track of the progress of these tasks from To Do, In Progress to Completed:

![user-stories](https://imgur.com/fbVZ6ji.png)

I did not create a wireframe for the UI on this task and I think that was a definite mistake - which I will talk a bit more about in the Learnings

## Build/Code Process

Due to the way that I had no direct link between Athletes and Coaches, it made it slightly more complicated to create some features that I wanted - such as a Coach being able to see all sessions they've had with a particular athlete.

```javascript
const getAthleteSessionsForCoach = async (req, res) => {
  try {
    const { coachId, athleteId } = req.params;
    const sessions = await Session.find({
      coachId: id,
      athleteId: athleteId,
    })
      .sort({ date: -1 })
      .populate("athleteId");

    res.json(sessions);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
```

This code is from my Sessions Controller that is used for the endpoint: /:coachId/athletes/:athleteId/sessions.
Since Coaches and Athletes are linked through the Session model - we look for all sessions that have both the coach and athlete ID that we receive from the request parameters.

```javascript
const getRelatedAthletes = async (req, res) => {
  try {
    const sessions = await Session.find({ coachId: req.params.id });
    const athleteIds = [
      ...new Set(sessions.map((session) => session.athleteId.toString())),
    ];
    const athletes = await Athlete.find({ _id: { $in: athleteIds } });
    res.json(athletes);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
```

Since I also wanted coaches to be able to see a list of all athletes they have ever had a session booking with - I created this getRelatedAthletes function. This function works by finding all sessions related to a coach and then using a set to get a distinct list of the Athlete IDs associated with these sessions - before searching the DB for these athletes and returning the data.

```javascript
const booking = ref({
  coachId: "",
  athleteContact: "",
  date: "",
  duration: "",
  type: "",
  location: "",
  notes: "",
  status: "pending",
});

const formErrors = ref([]);

const validateBooking = () => {
  formErrors.value = [];
  if (!booking.value.coachId)
    formErrors.value.push("A Coach is required to make a booking");
  if (!booking.value.athleteContact)
    formErrors.value.push("Athlete contact is required");
  if (!booking.value.date) formErrors.value.push("A Date is required");
  if (!booking.value.duration)
    formErrors.value.push("A Duration in minutes is required");
};
```

In the form for submitting new bookings, I added some basic validation to reduce the likelihood of errors on the backend - I only used some very basic validation to just check values were present as opposed to checking the values were in line with what was expected.

## Challenges

- One challenge I faced was a lack of planning for my Frontend - I went into a good level of detail planning out my backend endpoints and the ERD but didn't spend as long designing my frontend. This resulted in me having to rework a lot of the frontend as I added my functionality and was definitely a really valuable lesson in the importance of wireframing etc.

- Another slight challenge I had was with the routing on my Frontend - due to the way I had nested my backend it led me to doing the same on my Frontend but this led to some fairly unreadable and incredibly long URLs

```javascript
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/new",
      name: "newbooking",
      component: NewBookingView,
    },
    {
      path: "/bookings",
      name: "bookings",
      component: ConfirmedBookingView,
    },
    { path: "/bookings/complete", component: CompletedBookingView },
    { path: "/bookings/pending", component: PendingBookingView },
    { path: "/bookings/:coachId/:bookingId/notes", component: NoteListView },
    {
      path: "/bookings/:coachId/:bookingId/notes/:noteId",
      component: NoteEditView,
    },
    { path: "/bookings/:coachId/:bookingId", component: SingleBookingView },
    { path: "/athletes", component: AthleteListView },
    { path: "/athletes/:coachId/:athleteId", component: AthleteBookingsView },
    { path: "/success", component: SuccessView },
    { path: "/profile", component: ProfileView },
  ],
});
```

This was my Vue.js Router, as you can see some of the paths become incredibly nested, even more so due to the fact I'm using MongoDB object IDs - so for example the path: `/bookings/:coachId/:bookingId/notes/:noteId` could end up looking like: `/bookings/65a52e62c078571f72ecb200/65aa8ef322e2d7f8586c2498/notes/66019fd3650b073b1dce2cf1`

An additional section I found challenging was creating different views for Completed, Confirmed, and Pending sessions - I wanted users to be easily able to tab between these three different categories. They all make use of fairly similar elements in that they pull Sessions and display a card for each session - but the cards have different buttons - for example, the Pending cards will have a Confirm, Cancel & Details Button but the Completed Session Cards will just have View Notes button.

Due to the views being so similar I first tried making a generic view that I could adapt to be used for the three different states but I found this slightly too complicated. I ended up creating three separate views.

## Wins

![Bookings-page](https://imgur.com/ZvwBwpU.png)

Despite discussing these Views in the challenges I am also happy with how I presented them in the end. I created an additional Bar on the top to easily switch between viewing Pending, Confirmed & Completed bookings all of which send a request to the Backend making use of query parameters to filter the type of Session.

```javascript
const fetchData = () => {
  fetch(
    `${import.meta.env.VITE_API_URL}/get-user-id?email=${encodeURIComponent(
      user.value.email
    )}`
  )
    .then((response) => response.json())
    .then((data) => {
      userId.value = data.userId;
      return fetch(
        `${import.meta.env.VITE_API_URL}/users/${
          userId.value
        }/sessions?status=completed`
      );
    })
    .then((response) => response.json())
    .then((sessionsData) => {
      bookings.value = sessionsData;
    });
};
```

## Key Learnings

- A key learning I took from this project was the real importance of planning and preparation - having a good idea of how the site will work on both the Frontend and Backend is important to be able to efficiently tie the two together. Due to not having well fleshed out wireframes I ended up having to rework the frontend multiple times and spent time thinking about logic & design at the same time. In my initial project, I spent more time planning out the UI and this allowed me to focus a lot more on implementing the logic correctly

## Future Improvements

- I would like to focus on improving the style of my App - at the moment I think it feels very generic
- I would also to take another look at my Backend routing - I’m not sure if I ended up overengineering it for a small project like this or if I took the correct approach and would like to get a better understanding of this aspect
