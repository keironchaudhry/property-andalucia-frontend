# **Property Andalucia**

![am-i-responsive](/documentation/readme_images/design/am%20i%20responsive.png)

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
        <details>
        <summary>[Existing Features](#existing-features)</summary>
        <ul>
        <li>[Navigation Bar](#navigation-bar)</li>
        <li>[Home Page](#home-page)</li>
        <li>[Sign Up](#sign-up)</li>
        <li>[Login](#login)</li>
        <li>[Add Property Form](#add-property-form)</li>
        <li>[Edit Property Form](#edit-profile-form)</li>
        <li>[Property List View](#property-list-view)</li>
        <li>[Property Detail View](#property-detail-view)</li>
        <li>[Search Filter](#search-filter)</li>
        <li>[Notes](#notes)</li>
        <li>[Saves](#saves)</li>
        <li>[Saved Feed](#saved-feed)</li>
        <li>[Popular Sellers](#popular-sellers)</li>
        <li>[Follow Feed](#follow-feed)</li>
        <li>[Profile](#profile)</li>
        <li>[Edit Profile Form](#edit-profile-form)</li>
        <li>[Username and Password Forms](#username-and-password-forms)</li>
        <li>[No Results Found](#no-results-found)</li>
        </ul>
        </details>
    * [Future features to implement](#future-features-to-implement)
* [Testing](#testing)
* [Bugs during development](#bugs-during-development)
    * [Fixed bugs](#fixed-bugs)
    * [Remaining bugs](#remaining-bugs)
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

Images for the wireframes can be found in a separate page [here](/documentation/wireframes.md).

## **Colour**

The colour design used for this site has been a mixture of white, peach and shades of orange. The colour orange is a colour practically and argubly synonymous with the Iberian peninsula, which emits a feeling of sweetness, holiday and summer. This helps the website convey a feeling of being otherwise Spanish in design, feel and soul.

The hex codes are (in descending order as seen on the palette): #CC5500, #F99417, #FFF5EE, and #FFFFFF.

![colour-palette](/documentation/readme_images/design/colour%20palette.png)

## **Fonts**

Google Fonts was used for the font in this project. 

The principal font used is [Lora](https://fonts.google.com/specimen/Lora), which is in use across the application and with a light font weight for aesthetic ease. 

## **Iconography** 

The logo brand used for the web application was made using [Looka](https://looka.com/explore).

The interactive icons found across the web application were imported from [Font Awesome](https://fontawesome.com/).


# **Features**

## **Existing features**

#### **Navigation Bar** 

* Contains links for site navigation throughout application
* State changes links depending on logged-in status versus logged-out
    * If a user signs up as a seller they will be able to see the link to 'Add Property', as well as the other collective iconed links: view 'Saved' properties, view property 'Feed' (property listed by other followed sellers), their profile and the 'Logout' icon.
    * If a user signs up as a non-seller they will be able to see all the aforementioned links save the 'Add Property' icon.
* The brand logo is a clickable button that returns the user to home page.

![navbar-logged-out](/documentation/readme_images/features/navbar%20logged%20out.png)
![navbar-logged-in](/documentation/readme_images/features/navbar%20logged%20in.png)
![navbar-logged-in-2](/documentation/readme_images/features/navbar%20logged%20in%20(2).png)

* Designed to be responsive depending on screen size; links form a dropdown button when viewed on smaller viewport.
![navbar-small-viewport](/documentation/readme_images/features/navbar%20small%20viewport.png)

#### **Home Page**

* The home page is the first page seen upon visiting the web app and logging in.
* It contains the navigation bar, a list of property posts made by users, and the search filter component so visitors are able to interact with site content.

![home-page](/documentation/readme_images/features/home%20page%20logged%20out%20.png)

#### **Sign Up**

* Visitors are able to sign up for an account which allows them to add property posts, save posts, management of their profile and view property listing information.
* Visitors who wish to make a sellers account must simply check the checkbox indicated with "I am selling property" statement.
* Visitors must create a unique username and a password. 

![signup-form](/documentation/readme_images/features/sign%20up%20form.png)

#### **Login**

* Upon successful registration, the user is redirected to the 'login' page, where they can sign in with the created credentials.
* Users are requested to enter their username and password credentials.

![login-form](/documentation/readme_images/features/login%20form.png)

#### **Add Property Form**

* Authenticated sellers have exclusive access to the 'Add Property' icon, which directs them to the property post creation form.
* This form is not available to non-sellers, who are redirected back to the home page if attempted entry.
* Users are able to upload an image of their property
* If the image field is left empty, an automated default image will be rendered from the API
* Some fields are required and users are alerted by the API via warnings if there are any missing or invalid fields. 
* Input fields vary in type, some are text, some are numbers and some are checkboxes. 

![add-property-form](/documentation/readme_images/features/add%20property%20form.png)

#### **Edit Property Form**

* Edit property form mimics the property creation form, thus all of the fields are identical
* The form contains pre-populated input and image fields, which are easily editable.
* Save changes are evident from the moment of clicking the 'Save' button.

![edit-property-form](/documentation/readme_images/features/edit%20property%20form.png)

#### **Property List View**

* This view contains the shortened, listed view of all available properties.
* Contains a property listing count at the top, which increases/decreases with each addition or deletion.
* Property detail view can be accessed via the "View more..." link at the bottom of each listed property.
* Each listed object contains brief but important information about the listing, such as the image, the title, address, the price, description, measurement and bedroom/bathroom count.
* Each listing also contains the profile avatar and name of each object owner, as well as a save button. 
* All listings are ordered by creation date, the latest post being the top and first-seen post.

![property-list-view](/documentation/readme_images/features/property%20list%20view.png)

#### **Property Detail View**

* When accessed, the detail view reveals further information about a property object, such as the "Basic characteristics" and "Additional information".
* It contains a button to reveal the object owners telephone and email information. This can only be accessed by authenticated users and not by anonymous visitors.
* Contains a "Location" section, featuring the Google Maps component with the location of the property.
* Contains the "Notes" section at the bottom of the page, where all authenticated users can leave a private note. 

![property-detail-view](/documentation/readme_images/features/property%20detail%20view.png)

#### **Search Filter**

* Search filter can be accessed on home page, saved posts page and followers feed page.
* It can be interacted with by all users, authenticated or anonymous. 
* Users are able to filter by province, property type, price range, bedroom count and bathroom count.
* Filters work in coordination with each other, meaning that a property can be filtered gradually, an example would be: first by province, then by price, then by bedroom count.
* Contains a "Clear Filter" button which clears the search filters and restores the page to normal. 

![search-filter](/documentation/readme_images/features/search%20filters%20.png)

#### **Notes**

* Notes can be found at the bottom of all property detail views.
* The note form is easily accessible and instantly creates a note made by an authenticated user.
* All notes are made private in the API, thus only the current user can view notes.
* Anonymous users cannot make any notes without creating an account first.
* All notes made can be instantly edited via the dropdown menu.
* All notes amde can be instantly deleted via the dropdown menu.

![notes](/documentation/readme_images/features/note%20form%20and%20comments.png)

#### **Saves**

* Save icon can be found on both the list and detail view of a property post.
* Its state changes instantly upon clicking and unclicking.
* All saved property posts are filtered as listings under the "Saved" feed icon.
* Authenticated sellers cannot save their own posts.
* Anonymous visitors cannot make use of the save functionality.

![saves](/documentation/readme_images/features/saves.png)
![saves-1](/documentation/readme_images/features/saves%20(2).png)
![saves-2](/documentation/readme_images/features/saves%20(3).png)

#### **Saved Feed**

* "Saved" feed can be accessed in the navigation bar by both sellers and non-sellers.
* The icon on the navigation bar is not visible to anonymous visitors. 
* Posted objects in this filtered feed can increase/decrease saving/unsaving more posts.
* Akin to the home page, it contains a list view and detail view of all post listings.

![saved-feed](/documentation/readme_images/features/saves%20feed.png)

#### **Popular Sellers**

* Popular Sellers component can be viewed on the home page, saved page, follow feed page and logged-out page.
* Contains a list of the most followed sellers profile.
* Contains the Follow/Unfollow buttons, visible only to authenticated users.
* Does not contain any non-seller profiles as it is filtered in the API. 
* Anonymous visitors cannot follow or unfollow profiles.
* User profiles can be accessed and viewed via the visible avatars.

![popular-sellers](/documentation/readme_images/features/popular%20sellers.png)

#### **Follow Feed**

* "Feed" icon can be accessed in the navigation bar by both sellers and non-sellers.
* The icon on the navigation bar is not visible to anonymous visitors. 
* Contains a feed of all posts by a user that is being followed
* Posts increase/decrease according to the follow/unfollowing of a user
* Akin to the home page, it contains a list view and access to detail view of displayed listings.

![follow-feed](/documentation/readme_images/features/follow%20feed.png)

#### **Profile**

* Profiles pages are visible to both authenticated users and anonymous.
* Seller accounts are public whereas non-seller accounts are private
* Profiles pages are editable for both sellers and non-sellers, with fields such as email, telephone and image to match their desired brand.
* A dropdown button is available in which to modify username, password and profile.
* Seller profiles have post listings which can be accessed via their profile, revealing posts specific to the profile owner.
* Profiles contain follower and following counts.
* Profile pages contain a "Follow"/"Unfollow" button.
* Profile owners cannot follow their own pages

![profile](/documentation/readme_images/features/seller%20profile.png)
![profile-2](/documentation/readme_images/features/buyer%20profile.png)

#### **Edit Profile Form**

* Edit profile form can be accessed by dropdown menu by the owner of a profile object
* The form contains pre-populated fields with the current, modifiable inputs
* All inputs are updated when the "Save" button is clicked
* Email field is validated via the API and warns the user if the email entered is not standardised. 
* The telephone field is also validated via the API, requesting users enter a Spanish number (9 digits, beginning with 6, 7 or 9).

![edit-profile-form](/documentation/readme_images/features/edit%20profile%20form.png)

#### **Username and Password Forms**

* Username form contains functionality to change the username.
* Users cannot enter the same username and will receive an alert if they do.
* Password form contains functionality to modify the current password.

![username-form](/documentation/readme_images/features/username%20form.png)
![password-form](/documentation/readme_images/features/password%20form.png)

#### **No results found**

* "No Result" pages are as follows:
    * When there are no saved property listings
    * When the following feed is empty
    * When the user comes across a non-existent page (404 HTTP error)

![not-found-saves](/documentation/readme_images/features/no%20results%20found%20saves.png)
![not-found-follow](/documentation/readme_images/features/no%20results%20found%20follow.png)
![not-found-404](/documentation/readme_images/features/no%20results%20found%20404.png)

## **Components**

Components in React.js are independent pieces of [UI](https://www.techtarget.com/searchapparchitecture/definition/user-interface-UI) design that are split into reusable code blocks that can then be further developed and treated as a piece of code in isolation. This means that rather than having a single file for a web application page with hundreds to thousands of lines of code, variables and functions, different groups of code relating to a specific area of the page can be isolated and worked on separately. 

There are several components used and managed in this project and they are the following:

* Asset/Spinner
    * This component is used in several places in the application, moreover wherever data may be loading. When the Search Filter is used this component is utilised while the data is being fetched. 
    * Due to this, the UX is greatly improved as the page does not refresh redundantly and while the search filter is in use (such as clicking the dropdown option).

* Avatar 
    * Used to display the user profile image throughout the site.
    * UX experience is improved as users are able to instantly identify the owners of a publication and their information.

* Map
    * This component was used to create a map location on the property detail view pages.
    * It improves UX as it allows users to orientate themselves with relation to the property location.
    * It requires the user to enter a latitude and longitude to form a centre point. These can generally be found by going into Google Maps, holding right-click on a desired location which will then reveal the latitude and longitude points.
    * The [react-google-maps/api](https://www.npmjs.com/package/@react-google-maps/api) package was used to create this component. An API key is also needed from Google Cloud.

* MoreDropdown
    * This component is used in the property detail view page, published notes and user profile. It is a UX improvement as it allows users to access a dropdown menu to be able to modify or delete their own data.

* NavBar
    * The NavBar component is present on every page of the application. 
    * It contributes to improved UX as the user can access most of the site features in one place from all pages across the app.
    * The NavBar design collapsed into a burger menu with a smaller viewport size.

* NotFound
    * This component appears whenever a user tries to access an invalid or non-existent URL. 
    * It contributes to improved UX as the user is informed that the page does not exist.
    * It also appears where there are no saved posts or followed profiles with posts via the "Saved" and "Feed" buttons on the NavBar.


## **Future features to implement**

Ideas for possible future implementation are as follows:

* Implementation of a more active buyer account, i.e., buyer profiles should be more individual and particular to their nature
* Implementation of more diversified search filters, such as being able to narrow down search results by size, state (new-build, renovated etc.), numbers of floors, by date of publication and so on
* A direct messaging service where users can send private messages to another user
* Implementation of a rental market, where users can promote their property for rent at a monthly fee with further information
* Add a Google Translator tool which allows for the website to be translated across as many languages as possible
* A credit system for buyers or renters which acts as a guarantee of their reliability and reputation


# **Testing**

Testing can be found in a separate document [here](/documentation/testing.md).


# **Bugs during development**

#### **Fixed Bugs**

* To find a list of fixed bugs that were mended during development, [click here](https://github.com/keironchaudhry/property-andalucia-frontend/issues?q=label%3Abug+is%3Aclosed).

#### **Remaining Bugs**

* There are currently no known bugs.


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