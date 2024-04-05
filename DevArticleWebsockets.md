<!-- title: DevArticle -->
# How to implement server - client communication using **websockets** in a MERN stack in 10 minutes.
## Prerequisits

- Installation of a basic React app using 'Vite' or 'create-react-app'.
- Basic Setup of an Express.js server e.g.:

```
    import express from 'express'
    import cors from 'cors'

    const app = express();
    const HOST = "127.0.0.1";
    const PORT = 3050;

    app.use(cors());
    app.use(express.json());

    app.listen(PORT, () => {
        console.log("Welcome, " + HOST + ". You are connected on port: " + PORT);
    })
```

## Step 1

- Install the 'express-ws' package from node package manager:

```
    npm install express-ws --save
```

- and then import it in your project (preferably into a new file e.g. websocket.js):

```
    **websocket.js**

    import expressWs from 'express-ws';
```

## Step 2

- Now we will create a function that expects the express app as a value to wrap the websocket around it:

```
    **websocket.js**

    let Wss;  //We will store it in a variable for later use in other functions.

    const configureWebSocket = (app) => {
        const { getWss } = expressWs(app); // We wrap the websocket around our server and deconstruct the websocket client.

        // Will include functions later...
    
        Wss = getWss();
    };
```

- We will then define the path that the websocket listens to:

```
    **websocket.js**

        app.ws('/ws', (ws, req) => { // Here we tell the server to listen the the '/ws' path, in this case 127.0.0.1:3050/ws.
            console.log('WebSocket connected'); // When someone is connected to that path, we log that there is a connection.
        
            ws.on('message', (msg) => { // This fuction is called when a client sends a message to the server.
                console.log('Received message:', msg);
            });
        
            ws.on('close', () => { // This gets called after one of the clients has been disconnected from the websocket.
                console.log('WebSocket disconnected');
            });
        });
```

- Lastly we need to export this function so we can import it later:

```
    **websocket.js**

    export { configureWebSocket }
```

## Step 3

- We will now import this function in our main server.js:

```
    **server.js**


    import { configureWebSocket } from './Websockets/websocket.js';
```

- Then we can use that function to wrap our websocket around our app:

```
    **server.js**
    
    configureWebSocket(app);
```

Now we have a working websocket that listens when a client is connected or sends a message.
But we still need to write a function that sends a message to all connected clients when an update occured.

## Step 4

- Create a function that runs over all connected clients and sends them a message. We will write this function in the websocket.js.

```
    **websocket.js**

    const sendMessageToClients = () => {
        if (Wss) {
            Wss.clients.forEach((client) => {
                if (client._readyState === client.OPEN) {
                client.send(JSON.stringify({ event: "update" }));
                }
            });
        }
    }
```

- This funcion can be called anytime you need to let all clients know that something has updated.

## Step 5

- Now that we set up the server side sockets, we also need a websocket on our client, that listens to these messages. Or can send their own messages to the server.

- In this example I will use it inside a context in React that gets Courses from a DB. When a course has been added to the DB, we want our client to refetch those courses.

- My base useEffect looks something like this:

```
    **Courses.jsx

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('link_to_api_courses', {
                    method: "GET",
                    headers: {
                        "Content-Type": "Application/json"
                    }
                })
                if (response.ok) {
                    const data = await response.json();
                    setCourses(data);
                }
            } catch (error) {
                console.log(error.message);
            }
        }

        fetchCourses();
    }, [])
```

- Now we will implement our websocket inside this useEffect so this fetch happens also when our DB is updated.

- For this we will use the existing class WebSocket from React. You will see that this will look something similar as in the server.

```
    **Courses.jsx**

        let ws;
        const connectWebSocket = () => { // We create the function that will connect us to the websocket on the server.
            ws = new WebSocket("wss://link_to_server/ws"); // So for this we create a new instance of the WebSocket class, that needs the link to our server/ws.
            
            // Now we will use the same functions as we used in our server for the websocket. Just a little change in syntax.
            ws.onopen = () => {
                console.log("WebSocket connected");
            };

            ws.onmessage = (event) => { // This is the function that will actually listen to messages from the server, and checks if something has updated.
                const message = JSON.parse(event.data); // Get the data as JSON.
                if (message.event === "update") { 
                    console.log("message received");
                    fetchCourses(); // If the message.event returns 'update' we refetch all courses. Which will reload our webpage where the data is used.
                }
            };

            ws.onclose = () => {
                console.log("WebSocket disconnected. Reconnecting...");
                connectWebSocket(); 
            };
        };

        connectWebSocket(); // We call the function that connects us.
```

- With all of this in place, we now have a way to communicate from our React client to our Express.js server. In this case we just call this one way, where our server notifies the client when something has updated, to renew the data. But you can change this to make a whole chat system as well.

- There are endless options using websockets, and they are one of the best things ever.

- Happy Coding - Jonasi Deetens
