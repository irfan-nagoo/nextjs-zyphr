# request-tracker-app

![image](https://github.com/irfan-nagoo/request-tracker-app/assets/96521607/bcd60988-dc61-4a36-9f5b-4e09ce284381)



The project covers Service Request management use cases. The request-tracker-app is a frontend application fully developed using [React.js technology](https://react.dev/learn) powered by [Next.js framework](https://nextjs.org/docs). This application provides all the major features required by the service request management use case. This application uses [SWR](https://swr.vercel.app/docs/getting-started)  (Stale-While-Revalidate) feature of Next.js technology. The SWR technology enables this application to update the data grid without **reload/refresh** of the entire page but only the component which requires an update after a configured interval (currently 3 sec). Therefore, once the user lands on the dashboard page, all the operations could be performed without refresh/reload.  The SWR technology makes the request-tracker-app more responsive and perform better. The request-tracker-app also exposes some serverless REST APIs (powered by Next.js) however, these APIs are used for test only purpose in this application. The request-tracker-app can point to any REST APIs backend server with some configuration changes.


## Use cases and features

Here is the list of use cases offered by request-tracker-app:

  1. **Counts:** This application provides statistical data through various counts like total request count and unassigned request count.
  2. **Paginated and Sorted data grid**:  This application provides the paginated and sorted (latest first) data grid with all the service request (status: Open and Unassigned) data.
  3. **Paginated Search:** This application provides the paginated search feature (by Id and title) by updating the data grid on input query.
  4. **New Service request:** A popup dynamic modal form for new services request creation.
  5. **View and Edit request:** A popup dynamic modal form for displaying the service request details and editing the subset of fields.
  6. **Assign agent:** This feature would typically be used by the admin to assign/reassign service request to an agent.
  7. **Close Service Request:** This feature could by used by admin as well as user to close a service request.
  8. **Serverless REST APIs** These REST APIs are used in this application for test only purpose however, they could be enhanced to work as full fledge REST APIs backed by a database technology.

### Extendibility

This application could be enhanced to support user profiles creation and login. The user login would enable customized dashboard with only user specific content and feature exposure. Also, the Websocket notification support could be added with technologies like Socket.io which will broadcast notification when the new service request gets created. We can also add some other pages like history of all closed requests, charts/graphs for reports etc. The place holder for these features are provided in this application.

## CSS Technology

This application uses [Tailwind CSS framework](https://tailwindcss.com/docs/installation). The Tailwind provides lots of flexible classes which could be directly used in the application and they almost negate the extra CSS configuration. The other framework which was considered was [MUI framework](https://mui.com/x/introduction/) for react. The MUI framework is an opinionated framework like Bootstrap and has a huge user base.

## Configuration

This application requires Node 20 for installing packages and running the application.

**Tech Stack:** React.js 18, Next.js 14, Tailwind, Node 20, SWR

The dashboard of this application could be accessed @ http://localhost:3000/

