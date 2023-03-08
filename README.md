# **Property Andalucia**

amiresponsive

Property Andalucia is a property marketplace platform designed for selling and buying property. It allows the user to create their own listings and sell their property. As a visitor you can also search for property using a variety of search filter methods. The users can register for the website as a seller or a buyer, and gain access to further features such as saving posts and following other users.

This part of the project serves as the Frontend, created using React.js, which connects and interacts with the backend API through HTTP requests.

* Frontend Deployment can be found [here](https://property-andalucia-frontend.herokuapp.com/).

* Backend API Deployment can be found [here](https://property-andalucia-backend.herokuapp.com/).

* Backend API Repository can be found [here](https://github.com/keironchaudhry/property-andalucia-backend).


## **Table of content**

* [UX](#ux)
    * [Project Scope](#project-scope)
    * [Strategy](#strategy)
    * [User Stories](#user-stories)
* [Design](#design)
    * [Website Structure](#web-structure)
    * [Wireframes](#wireframes)
    * [Colour](#colour)
    * [Fonts](#fonts)
    * [Iconography](#iconography)
* [Features](#features)
    * [Existing Features](#existing-features)
    * [Future features to implement](#future-features-to-implement)
* [Testing](#testing)
* [Bugs during development](#bugs-during-development)
* [Technologies and libraries used](#technologies-and-libraries-used)
    * [Languages](#languages)
    * [Libraries and other resources](#libraries-and-other-resources)
* [Development and Deployment](#development-and-deployment)
    * [Local Deployment](#local-deployment)
    * [Deployment to Heroku](#deployment-to-heroku)
* [Credits](#credits)
    * [Inspiration](#inspiration)
    * [Code](#code)
    * [Acknowledgments](#acknowledgments)


# **UX**

The goal of this project was to build a marketplace for sellers to be able to display their properties and for potential buyers to be able view and interact with said items, and get in touch with the post owner. Key criterias in achieving this goal were identified as below:

* Build a site that distinguishes between sellers and buyers with different access points
* Build a site that provides the functionality to create a property
* Create functionality for a collection of specific search filters to narrow down interests
* Registered users should be able to save a post for future viewing
* Registered users should be able to follow sellers to stay up to date with their listings
* Both sellers and buyers can update their information in a profile page to better personalise their information and advertise themselves to potential sellers or buyers.

Please see [inspiration](#inspiration) section on this README to view the helpful sources inspired the UX design and choices.

## **Project Scope**

* **Functionality**

    * To be able to sign-up with a username and password creation
    * To be able to login and logout of an account successfully
    * To be able to visually view web app state changes for logged-in and logged-out users
    * To be able to create an account for sellers
    * To be able to create an account for non-sellers or buyers
    * To be able to create/view/edit/delete a post as a user
    * To be able to view a feed of listed posts by other users
    * To be able to access a detailed view of a particular post
    * To be able to use search filters to narrow down search results
    * To be able to create/view/edit/delete notes
    * To be able to save posts by another user
    * To be able to unsave posts by another user
    * To be able to view a feed of all saved posts
    * To be able to create/view/edit user profile information as a user
    * To be able to store, change and retrieve avatar image
    * Tp be able to view a list of popular profiles ordered by followers
    * To be able to follow another user profile
    * To be able to unfollow another user profile
    * To be able to view a feed of posts by followed users
    * To be able to change username
    * To be able to change password
    * To be able to receive feedback about form-submitted incorrect information

## **Strategy**

Selling a property can be an arduous task; selling several properties more so. It is often hard to find a simple web property application with an easy and engaging interface, hence this website was created to engage both sellers (non-professional individuals, agents or businesses) and buyers who can engage and network with each other.


## **User Stories**

Epics, User Stories and Backend Tasks can be found in this GitHub repository project Kanban board, and particularly for this project, all user stories can be found [here](https://github.com/users/keironchaudhry/projects/9/views/3).


# **Design**

## **Web Structure**

* Website is structured into 11 principal pages
* All pages extend and produce a consistent style across the application
* Pages are the following:

| Page | Description |
| --- | --- |
| **Navigation Bar** | Navbar header with site logo and collapsable link for media query sizes |
| **Sign Up** | Where users can create an account |
| **Login** | Where users can login with an account |
| **Home** | A landing page consisting of a general feed of posts |
| **Feed** | A list of all posts of followed accounts |
| **Saved** | A list of all posts saved by the current user |
| **Add Property** | A large form page where sellers can fill out their property data |
| **Edit Property** | A large form page where sellers can modify pre-existing fields
| **Post Detail** | A detailed view of the post featuring additional information |
| **Search Filters** | A UI component where users are able to access a variety of search filter methods |
| **User Profile** | A profile dashboard displaying information and user posts |
| **Edit Profile** | A large form page where users can modify pre-existing input |
| **Edit Username** | A form where the user can change their username |
| **Edit Password** | A form where the user can modify their password | 

## **Wireframes**

Images for the wireframes can be found in a separate page [here]().

## **Colour**

The colour design used for this site has been a mixture of white, peach and shades of orange. The colour orange is a colour practically and argubly synonymous with the Iberian peninsula, which emits a feeling of sweetness, holiday and summer. This helps the website convey a feeling of being otherwise Spanish in design, feel and soul.

The hex codes are (in descending order as seen on the palette): #CC5500, #F99417, #FFF5EE, and #FFFFFF.

![colour-palette](/documentation/readme_images/colour%20palette.png)

## **Fonts**

Google Fonts was used for the font in this project. 

The principal font used is [Lora](https://fonts.google.com/specimen/Lora), which is in use across the application and with a light font weight for aesthetic ease. 

## **Iconography** 

The logo brand used for the web application was made using [Looka](https://looka.com/explore).

The interactive icons found across the web application were imported from [Font Awesome](https://fontawesome.com/).


# **Features**

## **Existing features**

To be added.

## **Future features to implement**

Ideas for possible future implementation are as follows:

* Implementation of a more active buyer account, i.e., buyer profiles should be more individual and particular to their nature
* Implementation of more diversified search filters, such as being able to narrow down search results by size, state (new-build, renovated etc.), numbers of floors, by date of publication and so on
* A direct messaging service where users can send private messages to another user
* Implementation of a rental market, where users can promote their property for rent at a monthly fee with further information
* Add a Google Translator tool which allows for the website to be translated across as many languages as possible
* A credit system for buyers or renters which acts as a guarantee of their reliability and reputation


# **Testing**

To be added


# **Bugs during development**

To be added


# **Technologies and libraries used**

## **Languages**

The languages used are:

* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [React](https://reactjs.org/docs/getting-started.html)
* [CSS](https://www.w3.org/Style/CSS/Overview.en.html)
* [HTML](https://www.w3schools.com/html/)

## **Libraries and other resources**

* [React-Bootstrap](https://react-bootstrap.github.io/): a component library that provides Bootstrap components in a React.js environment.
* [Axios](https://axios-http.com/): HTTP client (Promise-based) for the browser and node.js. Used to make network requests throughout the application.
* [react-router-dom](https://www.npmjs.com/package/react-router-dom): Routing library for the React Javascript library to display different components based on URL entered into the browser.
* [react-infinite-scroll-component](https://www.npmjs.com/package/react-infinite-scroll-component): external package used to install an infinite scroller which manages the loading of paginated content.
* [react-google-maps/api](https://www.npmjs.com/package/@react-google-maps/api): external package used to install and show Google Map location of a property based on latitude and longitude.
* [Google Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/): used to access website performance.
* [Google Fonts](https://fonts.google.com/): used to import font utilised throughout site.
* [Font Awesome](https://fontawesome.com/): used for icons across website.
* [Icons8](https://icons8.com/): used for favicon.
* [GitHub](https://github.com/): used to store, develop and maintain project code.


# **Deployment and development**

The development environment used for this project was GitPod. Regular commits, pushes and merges to 'main' branch in GitHub via a 'development' branch were employed to be able to track and trace the development process of the website. All merges have been linked to their corresponding issues.

For local deployments instructions shall be written below, along with instructions with deployment to Heroku, the hosting service used to deploy this particular website. Heroku was chosen as the hosting service due to its database maintenance capabilities. 

## **Local deployment**

1. Go to the project repository
2. Click on the "Code" button.
3. Choose one of the three options (HTTPS, SSH or GitHub CLI) and then click copy (i.e., https://github.com/keironchaudhry/property-andalucia-frontend.git).
4. In your IDE, open terminal and run the git clone command (i.e., git clone https://github.com/keironchaudhry/property-andalucia-frontend.git).
5. The repository will now be cloned in your workspace.
6. This instruction list assumes that Node.js and npm are installed locally, if not, please install them.
7. In the terminal, type the command `npm install` to install all project dependencies.
8. Then finally run the command `npm start` to initiate the application.

## **Deployment to Heroku**

1. Log in to Heroku and navigate to your personal app dashboard.
2. Select 'Create new app'.
3. Give your application a unique name, select a region and click the 'Create app' button.
4. Select the 'Settings' tab and click 'Reveal Config Vars' in the Config vars section. Enter the following key value:
Key: REACT_APP__MAPS_API_KEY, value: Google Maps JavaScript API key. 
Click the Add button.
5. Go to the 'Deploy' page at the top of the page.
6. Select 'GitHub' from the 'Deployment method' section and you will be able to 'Connect to GitHub'.
7. From there you will be able to search for your repository in the search tab.
8. Once searched and the repository has appeared, click 'Connect'.
9. At the bottom of the same page, go to 'Manual deploy', select the 'main' branch in the drop down and click the 'Deploy' button.
10. Once deployment is complete, you will then be able to view your deployed project.


# **Credits**

## **Inspiration**

* [Idealista](https://www.idealista.com/venta-viviendas/malaga-malaga/), a popular property service in Spain, was helpful in guiding me in crafting ideas toward frontend design and functionality (such as the property detail view, a service for professional sellers and search filter ideas).

* Code Institute's Advanced Frontend '[Moments](https://github.com/Code-Institute-Solutions/moments)' walkthrough was momentous in providing guidance, teaching, code structures and the general idea for this project, all of which has been credited in the project as having provided the code or having been an adaptation of said code.

## **Code**

The following websites proved to be both insightful and helpful during development of this project, in addition to the aforementioned sources:

* [Stack Overflow](https://stackoverflow.com/)
* [W3School](https://www.w3schools.com/)
* [GeeksForGeeks](https://www.geeksforgeeks.org/)
* [YouTube](https://www.youtube.com/)
* [React Google Maps API](https://www.npmjs.com/package/@react-google-maps/api)

## **Acknowledgments**

For inspiration, guidance and inputs, thank you to:

* Spencer Barriball

    Absolutely fantastic mentor at Code Institute with brilliant insight into React.js, JavaScript in general and Frontend design.
    
* Jack Crymble

    Friend and guide, thank you for your knowledge and insight!

* Jody Murray

    Fellow student and colleague, thank you for your input and constant support!