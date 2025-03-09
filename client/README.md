Collaborative Notepad
A real-time collaborative notepad where multiple users can edit the same document simultaneously. Changes made by one user will be instantly visible to all others.

Brief Steps for Installation & Running the Application
1. Prerequisites
Node.js (version 14 or later) and npm installed.
Same local network for multiple devices to work together.
2. Setup Instructions
Backend Setup (Node.js + Socket.io)
Navigate to the server folder:

bash
 in server
Install backend dependencies:
npm install
## Run the server:
bash
node server.js
The backend will be available at http://localhost:3000.

Frontend Setup (React + Vite)
Navigate to the client folder:

bash
cd client
Install frontend dependencies:

bash
npm install
Run the frontend app:

npm run dev
The frontend will be available at http://localhost:5173.

3. Testing on Multiple Devices
Find your backend’s local IP (e.g., 192.168.x.x) on the backend device (use ipconfig on Windows or ifconfig on macOS/Linux).

Update the frontend to connect to the backend IP: In client/src/App.jsx, replace:


const socket = io('http://localhost:3000');
with:

const socket = io('http://<Backend-IP>:3000');
Open the frontend on multiple devices by visiting http://<Backend-IP>:5173 on each device.

Now, any changes in the text area will sync in real-time across all devices.

