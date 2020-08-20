# DevConnector

> MongoDB, Express, React and Node.js

A network to interact with Devs.

<img src="https://github.com/NietoCurcio/DevConnector-TraversyMedia-Project/blob/master/readme/image0.png?raw=true" width="900" alt="DevConnector">

## Structure

### Server side

Server side, there is the express framework, it take care of authentication with JSON Web Tokens (so that the client has protected routes, receiving token from the server), models, endpoints and access to MondoDB URI. To do that was used the mongoose package, to create models (collections which store documents) and interact with them in the database, could be used the MondoDB driver for this porpuse as well. To access endpoints that requires token, we have the middleware auth.js to check if the token is valid and exist in the headers of the requests.

### Client side

Client side was made with React framework, the client request data from our server listenings for requests. We have Redux state management to handle the state of the application, as well as state components with useState hook. Redux and React work very well together, there is the react-redux librarie and redux-thunk middleware to handle better with async fetch calls, in that way the components doesn't care about whether the actions are async or sync (is possible deal with async actions without thunk, but thunk helps a lot, because that middleware return a function instead a object in the actions creators, in that function we have access to store methods dispatch and getState as parameters).
[More about redux thunk middleware with Dan Abramov](https://stackoverflow.com/questions/34570758/why-do-we-need-middleware-for-async-flow-in-redux/34599594#34599594)

**Redux state management (dev tools)**

<img src="https://github.com/NietoCurcio/DevConnector-TraversyMedia-Project/blob/master/readme/image1.png?raw=true" width="800" alt="DevConnectorState">

In that image we can see that there are four reducers combined in our rootReducer (alert, auth, profile and post)

**Posts page**

<img src="https://github.com/NietoCurcio/DevConnector-TraversyMedia-Project/blob/master/readme/image4.png?raw=true" width="800" alt="DevConnectorPosts">

**Dashboard**

You can create your profile with description about yourself, adress, company experience credentials, education credentials and technologies which you have some knowledge, you can also see a list of developers registered in the network to interact and know more about them.

<img src="https://github.com/NietoCurcio/DevConnector-TraversyMedia-Project/blob/master/readme/image3.png?raw=true" width="800" alt="DevConnectorPosts">

### About that stack

The database was built with MongoDB atlas cloud database

> That technologies together make a powerful stack, with a solid base of Javascript. In the database we have a no-sql document database with documents (documents, being objects and nested objects) in the collectionss. From the server comes JSON response handle by middleware authentications, models and endpoints. The client side is updated based in the state, managed by Redux in a tree or object format; both, React and Express framework, have Node to handle the libraries, dependencies and run scripts.

I studied the built of this project in Brad Traversy's MERN stack course.
