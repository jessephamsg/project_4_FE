# Readme

Project Collaborator
1) Tam 
2) Lina
3) Yue Jia

# App Title - TLY Education app 

This application is a website that provides educational games for kids to learn in a interactive and engaging way. Data is collected through the games and send to parents in order to review and have a better understanding of their kid learning journey.

## Application link "

- (link to application)

## Table of Contents
- [Introduction](#Introduction)
- [Project Approach](#project-approach)
- [Technology Used](#Technology-used)
- [Main Features](#Main-features)
- [User Journey Map](#User-Journey-Map)
- [Developer Journey](#Developer-Journey)
- [Future Development](#Future-Development)

# Project scope



## Introduction

Let's admit it, we struggled to keep up with children who seems to possess an unsurmountable amount of energy from a mysterious source. Parents often find screen as a easy way and effective solution to keep children occupied, granting parents the precious time to perform their task or simply to recharge energy lost. 

Current generation parents also need to juggle between work and managing their child's learning journey. It is a common struggle among parents to be physically managing both. This is especially true in the midst of COVID-19 pandemic where major activities are largely at home like  Parent's (Work From Home) wfh status and Home-Based Learning for children.

As social media tools such as tiktok and youtube become more accessible by children, It is increasingly a worrying sign as a child may be exposed to unfiltered and not child-friendly contents in such site. Over-reliant on using screen to keep children occupied also decreases parent-child interaction.

As such, more educational companies are pouring resources and energy to create digital products that keeps children engaged and learning at the same time. With a good system, it can help parent better manage their child's home-based learning , making children's screentime purposeful and help parent to juggle between managing children and work at home. 

### This application therefore aims to achieve 3 objectives:

- 1) the educational application has to engage and trigger a child's learning journey.

- 2) Display data collection from the children engagement with the app to provide parent with insights to their child's learning journey

- 3) The app does not seek to prolong the amount of screen-time but aims to make more meaningful screen-time for the child. In this case, learning while having fun. 

### In view of this, the application developed aims to 
1) Target at matured gamers
2) Have a system of setting personal account and able to post their information and view other people's account. 

## Project Approach

The approach to this project is to set up a basic MVC structure with all CRUD routes created and MONGODB connected for a single user. User's homepage, contentpage, viewpage, editpage and postpage to be created for a single User.

Set up database and Schema validation in a way that when user sign in, it will retrieved database corresponding to its username. 

Secondly, built authentication for a single user to retrieve its own information.

Next, build main application page where all user's basic info and latest post is displayed. Upon entering the post, Users can view all post posted by that users. 

Other users can post comments other other user's viewpages. 

BONUS : include password authentication and adding a social list. 

## Technology used

1) MERN stack architecture
2) MVC structure
3) Axios
4) Passport JS 
5) Cors
6) Heroku (for deployment of application)
7) Mongo Atlas ( for storing databases on cloud platform)
8) MDBReact (minimal usage) 
9) CSS (no framework)
10) React-Spring
11) Rough-Chart JS
11) External source
    - (if any, to be added)

## Main Features

### New MVP
- CSS new framework. To create our own framework
- MDBReact. Minimal usage for css library
- Rough-Chart JS. To display statistic. 
- react-spring. For Game interaction. 
- react-use-gesture. Gesture interaction.
- lodash. managing Array and numbers 
- React state control.  useContext / Redux / Reducer

### Features
#### backend
- CRUD method for 4 library structured as such Child / Parent / Game / GameStat
- Authentication layer using PassportJs to authenticate User. 
- Mongoose Data Schema for each library
- Structured as below [see MVC structure below]

#### frontend
- Game creation with logic and algorithm. 
- Recoriding statistic and displaying on each childreport page accessible ONLY to parent


## DATA STRUCTURE
<img src ="./offline/architecture.PNG" width= "100%">

## User Journey Map

1) LandingPage. Parent learn about the application or log in for registered user. 

2) Register. Parent register an account for themselves. 

3) Game Infopage. Games information would be displayed here to inform Parent the games available. 

4) Log In. Parent log in and redirects to dashboard page. 
 - Local storage will store parent data
 - Backend passportJS will register parentData. Req.user would contain logged In parent Data. 
 - Context Provider will provide AuthenticatedUser throughout the app wrapped in Provider. 

5) On Homepage. A Child will have access to their own profile by clicking on their avatar.

// screenshot

6) Child Game page. A Child would be able to select the game available. They can also see the latest game they have played. 

// screenshot

7) Gameboard. Each game would have a formatted initial button.
 - After Each gameplay, statistic would be captured and send to backend. 
 - Each submission sends data that involves, game score, number of tries, games title played, completion rate and game comparison. 

 // screenshot of gameboard

8) Parent DashboardPage. Page view ONLY for parent.

- Parent need to input acct password in order to access dashboard. 
// screenshot of input password
- Parent can do CRUD operation for a child here. Adding / Editing or Graduating (Delete) a child data. 
// screenshot of parentDashboard
// screenshot of adding child (Modal pop up)

9) Child ReportPage. For Parent to view each Child statistic. Here display A child performance on all games and comparison between each game. 
// screenshot of child report page. 

10) Log Out. Upon logging out, Parent localstorage would be deleted. *Application - As long as parent do not log out, a child can have access to games even when browser is close. or for another day's session. This is to facilitate self learning when parent are not physical present. 


## Developer Journey


