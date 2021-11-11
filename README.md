# Node.Js Chat Room

## Install

1. ```git clone https://github.com/hossein-taheri/Chat-Room.git```
1. ```cd Chat-Room/```
1. ```cp .env.example .env```
1. Fix all config settings here ```vim .env```
1. ```npm install```

## Test

1. ```npm test```

## Usage

1. Run project via ```npm start```
2. Authentication api routes can be found in `"postman/Chat Room.postman_collection.json"`
3. Socket Client Listeners :
   <br/>
   'error' : {error_message}
   <br/>
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; receiving any error
   <br/>
   'all-messages' : {messages}
   <br/>
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; receiving previous messages in chat
   <br/>
   'new-message' : {messages}
   <br/>
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; receiving new message from everyone in the room
   <br/>
   'system-information' : {type, message}
   <br/>
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; receiving any system information ( type can be :  "user-connected" ,"
   user-disconnected"
   , "start-typing" and "stop-typing")
4. Socket Client Emitting events :
   <br/>
   'send-message' : {body}
   <br/>
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; send a new message in chat room
   <br/>
   'start-typing'
   <br/>
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; send "start-typing" status 
   <br/>
   'stop-typing'
   <br/>
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; send "stop-typing" status 
   
