Blog Platform
A modern, user-friendly blogging platform built with React, Vite, and Tailwind CSS. This application allows users to create, edit, delete, and favorite blog posts, as well as add and view comments. The app is deployed on Vercel and uses a JSON Server as the backend API to manage posts and comments.
Features

Create Posts: Add new blog posts with a title, content, author, and optional image URL.
Edit/Delete Posts: Modify or remove existing posts with a simple interface.
Favorite Posts: Mark posts as favorites with a star icon for quick reference.
Comment System: Add and view comments on individual posts.
Search Functionality: Search posts by title or content using a dynamic search bar.
Responsive Design: Optimized for both desktop and mobile devices with a clean, dark-themed UI.

Live Demo

Blog Platform: https://blog-nine-nu-48.vercel.app or https://blog-platform.vercel.app
Backend API (JSON Server): https://json-server-vercel-last.vercel.app/posts

Tech Stack

Frontend: React, Vite, Tailwind CSS, React Router, React Icons
Backend: JSON Server (deployed on Vercel)
Deployment: Vercel
Styling: Tailwind CSS for responsive and modern design

Prerequisites

Node.js: Ensure you have Node.js (v16 or later) installed.
Vercel Account: Required for deployment.
GitHub Account: To manage repositories and deploy via Vercel.

Setup Instructions
Local Development

Clone the Repository:
git clone https://github.com/ErykahWanga/Blog-Platform.git
cd Blog-Platform


Install Dependencies:
npm install


Set Up Environment Variables:

Create a .env.development file in the project root:VITE_API_URL=http://localhost:3001/posts




Run the Local JSON Server:

Clone the JSON Server repository:git clone https://github.com/ErykahWanga/json-server-vercel.git
cd json-server-vercel
npm install
npm run start:db


This starts the JSON Server at http://localhost:3001/posts.


Run the Development Server:

In the Blog-Platform directory:npm run dev


Open http://localhost:5173 in your browser to see the app.



Deployment on Vercel
Deploy the JSON Server

Create a Vercel Project for JSON Server:

Go to vercel.com and click “Add New” → “Project.”
Select the ErykahWanga/json-server-vercel repository.
Configure:
Project Name: json-server-vercel (e.g., domain: json-server-vercel.vercel.app).
Framework Preset: “Other.”
Build Settings: Leave defaults.


Click “Deploy.”


Verify the JSON Server:

Once deployed, visit the provided domain (e.g., json-server-vercel.vercel.app/posts).
You should see the posts data in JSON format.



Deploy the Blog Platform

Create a Vercel Project for the Blog Platform:

Go to vercel.com and click “Add New” → “Project.”
Select the ErykahWanga/Blog-Platform repository.
Configure:
Project Name: blog-platform (e.g., domain: blog-platform.vercel.app).
Framework Preset: “Vite.”
Build Settings:
Build Command: npm run build
Output Directory: dist
Install Command: npm install


Environment Variables:
Name: VITE_API_URL
Value: https://json-server-vercel-five-jet.vercel.app/posts (or your JSON Server domain from above).
Environment: Production




Click “Deploy.”


Assign Custom Domain (Optional):

Go to Settings → Domains.
Add blog-nine-nu-48.vercel.app if desired.
Save and redeploy if prompted.


Verify the Deployment:

Visit the deployed URL (e.g., blog-platform.vercel.app or blog-nine-nu-48.vercel.app).
You should see the blogging platform with the list of posts.



Usage

View Posts: Browse the list of posts on the homepage.
Search Posts: Use the search bar to filter posts by title or content.
Add a Post: Click “Add Post” in the navigation bar to create a new post.
Edit/Delete a Post: Use the edit (✎) or delete (🗑️) icons on each post.
Favorite a Post: Click the star icon (★) to toggle a post as a favorite.
View Comments: Click “View More” on a post to see comments and add new ones.

Project Structure

src/components/: Contains React components like AddPost.jsx, PostList.jsx, etc.
src/App.jsx: Main app component with routing.
public/: Static assets like the favicon.
tailwind.config.js: Tailwind CSS configuration.
vite.config.js: Vite configuration for the build process.

Contributing

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Make your changes and commit (git commit -m "Add your feature").
Push to the branch (git push origin feature/your-feature).
Open a Pull Request on GitHub.

License
This project is licensed under the MIT License. See the LICENSE file for details.
Contact
For questions or feedback, reach out via GitHub Issues or contact the project maintainer at [erkahwanga@gmail.com].
