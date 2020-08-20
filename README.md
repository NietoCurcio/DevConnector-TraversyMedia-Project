# DevConnector

> MongoDB, Express, React and Node.js

<!-- <img source="./readme/image0" width="800px"> -->

![DevConnector](/readme/image1)

## Structure

### Server side

Server side, there is the express framework, it take care of authentication with JSON Web Tokens (so that the client has protected routes, receiving token from the server), models, endpoints and access to MondoDB URI. To do that was used the mongoose package, to create models (collections which store documents) and interact with them in the database, could be used the MondoDB driver for this porpuse as well. To access endpoints that requires token, we have the middleware auth.js to check if the token is valid and exist in the headers of the requests.

### Client side

Client side was made with React framework, the client request data from our server listenings for requests. We have Redux state management to handle the state of the application, as well as state components with useState hook. Redux and React work very well together, there is the react-redux librarie and redux-thunk middleware to handle better with async fetch calls, in that way the components doesn't care about whether the actions are async or sync (is possible deal with async actions without thunk, but thunk helps a lot, because that middleware return function instead a object in the actions creators, in that function we have access to store methods dispatch and getState as parameters).
[More about redux thunk middleware with Dan Abramov](https://stackoverflow.com/questions/34570758/why-do-we-need-middleware-for-async-flow-in-redux/34599594#34599594)

**Post**

![DevConnectorState](/readme/image1)

**Redux state management (dev tools)**

![DevConnectorState](/readme/image1)

In that image we can see that there are four reducers combined in our rootReducer (alert, auth, profile and post)

The database was built with MongoDB atlas cloud database

> That technologies together make a powerful stack, with a solid base of Javascript. In the database we have a no-sql document database (documents being objects and nested objects) in the collections. From the server comes JSON response handle by middleware authentications, models and endpoints. The client side is updated based in the state, managed by Redux in a tree or object format; both, React and Express framework, have Node to handle the libraries, dependencies and run scripts.

![DevConnector](/readme/image1)

I studied the built of this project in Brad Traversy's MERN stack course.
