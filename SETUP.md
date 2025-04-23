Setup Instructions for Wish Blogging Platform
Follow these steps to set up and run the blogging platform project locally.
Prerequisites

Node.js (v16 or higher)
npm (v8 or higher)
Git

Setup

Clone the Repository:
git clone https://github.com/your-username/wish-blogging-platform.git
cd wish-blogging-platform


Install Dependencies:
npm install

This installs Vite, React, Tailwind CSS, react-router-dom, and JSON Server.

Run the JSON Server:
npm run start:db

This starts the JSON Server at http://localhost:3000. Check http://localhost:3000/posts to verify (should show posts or []).

Run the Development Server:
npm run dev

This starts the Vite dev server at http://localhost:5173.

Open the App:

Open http://localhost:5173 in your browser.
Navigate to pages like /add (Add Post) or /favorites (Favorite Posts).



Testing Backend

Visit http://localhost:3000/posts to see the posts data.
Add a sample post to db.json:{
  "posts": [
    {
      "id": 1,
      "title": "Sample Post",
      "content": "This is a sample post.",
      "author": "John Doe",
      "isFavorite": false
    }
  ]
}


Use the Add Post page (/add) to create posts and check they appear at http://localhost:3000/posts.

Troubleshooting

Blank Post List Page:
Open the browser console (F12 → Console) and check for errors (e.g., "Failed to fetch").
Ensure JSON Server is running (npm run start:db) and http://localhost:3000/posts responds.
Verify PostList.jsx fetches from http://localhost:3000/posts and handles empty data.
Clear Vite cache: rm -rf node_modules/.vite and restart (npm run dev).


Add Post Not Working:
Check the console for errors during form submission in AddPost.jsx.
Ensure fetch uses http://localhost:3000/posts with correct headers (Content-Type: application/json).
Verify JSON Server is running and accepts POST requests.


Missing Like/Delete/Edit Buttons:
Confirm PostList.jsx renders posts and buttons (View, Edit, Delete, Favorite).
Check if posts array is empty (add a sample post to db.json).
Inspect handleDelete and handleFavorite for errors in the console.


Blank Screen (General):
Verify index.html has <div id="root"> and main.jsx renders into it.
Ensure App.jsx renders Navbar and Routes without BrowserRouter.


Nested Router Error:
Ensure only main.jsx uses BrowserRouter. Remove BrowserRouter from App.jsx or other components.


Git Push Rejected:
Run git pull origin main, resolve conflicts, and push again.


Missing Dependencies:
If errors like "Cannot find module 'react-router-dom'", ensure package.json includes it and run npm install.


Backend Issues:
If posts don’t load, verify JSON Server is running and fetch URLs use http://localhost:3000/posts.


Port Conflicts:
If 3000 or 5173 is in use, change ports in package.json or terminate processes.


UI Issues:
Verify Tailwind CSS is loaded via index.css and tailwind.config.js.



Team Workflow

Create a branch: git checkout -b <your-name>
Commit changes: git commit -m "Description"
Push: git push origin <your-name>
Create a pull request on GitHub.
Pull before pushing to main: git pull origin main.

