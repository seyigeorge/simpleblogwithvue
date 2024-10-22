A simple blog platform built using Vue.js, where users can add and view blog posts. The application includes responsive navigation, basic routing, and a post creation form.

Features

- Create new blog posts.
- View a list of blog posts.
- Responsive design for mobile and desktop.
- Simple and easy-to-use interface.


Table of Contents

- Technologies Used
- Installation
- Usage
- Scripts
- File Structure
- Contributing
- License


Technologies Used

- Vue 3: Front-end framework.
- Vue Router: For handling routes and navigation.
- Tailwind CSS: For styling the components.


Installation

1. Clone the repository:
git clone https://github.com/seyigeorge/simpleblogwithvue.git
cd vue-blog

2. Install dependencies:
npm install

3. Run the development server:
npm run serve

Your application will be running on http://localhost:8080.


Usage
To use this application, open the browser and go to the homepage. You can navigate through the app and create a new blog post by clicking on the "Add Post" link.

The app includes the following routes:

/: Home page to view the list of posts.
/add-post: Add new blog post form.


Scripts
Here are the common scripts to run the project:

- Start Development Server:
npm run serve

This will start a local development server on http://localhost:8080/

- Build for Production:
npm run build

Builds the app for production in the dist folder


File Structure
Here's the basic structure of the project:

.
├── public/
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── assets/
│   ├── components/
│   ├── views/
│   │   ├── AddPost.vue
│   │   └── Home.vue
│   ├── App.vue
│   ├── main.ts
│   └── router.ts
├── .gitignore
├── package.json
├── README.md
└── tailwind.config.js

Contributing
- Fork the repository.
- Create a new branch.
- Make your changes and commit them.
- Push to the branch.
- Submit a pull request.