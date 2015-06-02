# Join My Party

### Demo
[Live Demo](https://join-my-party.firebaseapp.com)

To run the app with NodeJs and GulpJs, do the following:

* Clone the project: `git clone https://github.com/mtuan93/join-my-party.git`
* Install npm plugins: `npm install`
* Install gulp: `npm install -g gulp`
* On the command line, start the local server: `gulp`
* The web application is now available at `localhost:8000`

### Introduction

**Join My Party** is a **web application** that will let people check in to available parties, view who checked in, and leave messages or comments about the parties. It also provides past parties with galleries. **Join My Party** is written using **AngularJs**, **AngularFire**, and **NodeJs**.

The inspiration behind **Join My Party** is that I and my friends have been having a hardtime to keep track of people who will attend our parties. We also want to know what ideas or comments that people want to tell us before attending the parties so that we can prepare it as best as possible.

### Features

* Single page web application.
* Friendly, responsive, and fast user interface by using `Bootstrap` and `Jquery`.
* Using a [customized animated button](http://jeremypeters.github.io/ng-bs-animated-button/) for extra enhancements.

### Libraries

* angular.js
* angular-route.js
* angular-animate.js
* angularfire.js

### API and Frameworks

* Frontend: Angular, Bootstrap, Jquery
* Backend: Firebase
* Code runtime: NodeJs
* Task runner: GulpJs

### Core App Structure

#### index.html

Contains dynamic `nav` bar and the main partial `ng-view`.

#### /views/nav.html

This is a fixed-positioning navigation bar. It dynamically displays a welcome message to logged-in user and contains tab to let user login, register, or view parties list.

#### /views/login.html and /views/register.html

They are forms to let user login or register a new account with customized-animation submitting buttons.

#### /views/parties.html

Contains two sections for available parties and past parties. Each section will have a customized-animation submitting button to either check in one of available parties or view past's parties galleries.

#### /views/checkinList.html

Contain a section with information about the party and a form to submit checkin with a message. The submit button is a customized-animation button. There is also a section below to display a list of people who checked in and their messages. Current user after submitting message can change the message in this page.

#### /js

* `app.js` - where the entire web application is configured including routing handler.
* `/services/authentication.js` - Handle login, logout, and register between the app and the actual server on `Firebase` service. It main role is to maintain an authenticate session when the user is logged in. 
* `/directives/*.js` - contains two customized directives `autofocus` and `showfocus`. 
	* `autofocus` will be added to an input field to auto focus the input when the page first load. The default `autofocus` in `HTML5` is not working with `AngularJs` model.
	* `showFocus` will be added to an input field to focus on the element when `ng-show` triggers the display of the field.
* `/controllers/Registration.js` - A controller to handle login, logout, and register between the client and the web application. It also utilized the customized-animation submitting button for enhanced effects.
* `/controllers/Checkin.js` - A controller to handle submitting checkin, message, and change message. It also utilized the customized-animation submitting button for enhanced effects.



