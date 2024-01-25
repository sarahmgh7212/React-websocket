# Frontend Test Task with WebSocket

## App features

- The web app consumes data from WebSocket and display it in a table.
- It displays the top 10 users, sorted by score, highest to lowest. If there are already at least 10 rows, and a new entry arrives from WebSocket, but it has a lower score than the existing top 10, then it should be ignored and not added to the list.
- The number of displayed results can be configured in Settings tab. By default it's 10.
- Each row has a delete button, clicking that will remove the row.

## How to run the project:
- The backend service that emits the random data already exists and can be used as is.
- To start it, you need to have Node.js installed, change directory to "emitter" and, run "npm i" and "npm start".
- It will start a Socket.io server on ws://localhost:3050
