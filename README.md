# Sorta_pixel-sorting
A GUI for live-rendered pixel-sorting; image manipulation
# Project Title

#### Sorta

## Overview

What is your app? Brief description in a couple of sentences.

    A UI for creating glitch art by manipulating uploaded images using pixel-sorting, 
    with real-time previews of the images as they are being edited. 

### Problem

Why is your app needed? Background information around any pain points or other reasons.

    Pixel-sorting can be tricky and users may not have the tools they need to manipulate the images 
    they want while seeing the results in real-time. 
    My app will provide an intuitive interface that simplifies the process, 
    allowing users to experiment and create glitch art without the need for in-depth programming knowledge.

### User Profile

Who will use your app? How will they use it? Any special considerations that your app must take into account.

    Artists, designers, and hobbyists interested in digital art 
    and glitch aesthetics will find this app particularly useful. 
    It is designed to handle JPEG and PNG files to accommodate a wide range 
    of image formats used by the target audience.

### Features

List the functionality that your app will include. These can be written as user stories or descriptions with related details. Do not describe _how_ these features are implemented, only _what_ needs to be implemented.

#### Image upload: 
    users can upload JPEG and PNG files to apply the pixel-sorting

#### Real-time pixel-sorting algorithm: 
    A dynamic, real-time rendering of pixel-sorting effects as users adjust settings

#### Customizable Sorting Parameters: 
    Tools to adjust various aspects of the pixel-sorting algorithm, such as orientation and sorting method.

#### Image download option: 
    Ability for users to download the manipulated image in its original format. 

#### Gallery of User-Created Images
    Lets users save their created images to a gallery to browse through later


## Implementation

### Tech Stack

List technologies that will be used in your app, including any libraries to save time or provide more functionality. Be sure to research any potential limitations.

#### React: 
    for building the UI

#### Node.js/Express:
    for the backend server

#### HTML Canvas API: 
    for the real-time canvas feature, rendering the sorted pixels

#### potential libraries: 
    react-drop, file-saver, react-slider

### APIs

List any external sources of data that will be used in your app.

#### Canvas API: 
    for handing the image data on the front end

#### Backend API (of my making):
    for storing and retrieving gallery images


### Sitemap

List the pages of your app with brief descriptions. You can show this visually, or write it out.

#### Home Page: 
    Where users upload, manipulate, and download their images

#### About Page:
    Information about using the app, FAQ, about glitch art and pixel sorting

#### Login Page:
    Users need to login in to save images to/view images in the Gallery

#### Gallery Page:
    Gallery of images created by the user


### Mockups

Provide visuals of your app's screens. You can use tools like Figma or pictures of hand-drawn sketches.

#### Mockup of main page and control panel

<img width="402" alt="sorta_main-mockup" src="https://github.com/allisondw/Sorta_pixel-sorting/assets/102693788/6c2b2d14-a2cc-4175-a61a-4fdc09be2cd3">


#### Mockup of image gallery

<img width="980" alt="sorta-gallery-mockup" src="https://github.com/allisondw/Sorta_pixel-sorting/assets/102693788/3af3bc52-8964-43ad-8b43-898ce0f1669b">


#### Demo video of Canvas API dynamic render of pixel-sorting

https://github.com/allisondw/Sorta_pixel-sorting/assets/102693788/feea807d-a0fc-41cf-a00d-53264b557bc1




### Data

Describe your data and the relationships between them. You can show this visually using diagrams, or write it out. 

#### User Image Data: 
    The image uploaded by the user, stored temporarily during the manipulation process

#### Pixel Data: 
    The data structure used to store and manipulate pixel information from the uploaded image

### Endpoints

List endpoints that your server will implement, including HTTP methods, parameters, and example responses.

#### POST /upload: 
##### Receives the image file from the user
    - parameters: 'imageFile'
    - example response: { success: true, message: "Image upload complete" }

#### GET /gallery
##### Retrieves all saved images from user
    - parameters: 'userId/username'
    - example response: { success: true, images: [<list-of-gallery-images>] }

#### POST /save-image
##### Saves a created image to the user's gallery
    - parameters: 'userId/username', 'imageData'
    - example response: { success: true,  message: 'Image saved' }

### Auth

Does your project include any login or user profile functionality? If so, describe how authentication/authorization will be implemented.

 

## Roadmap

Scope your project as a sprint. Break down the tasks that will need to be completed and map out timeframes for implementation. Think about what you can reasonably complete before the due date. The more detail you provide, the easier it will be to build.


#### 1. Set up React Environment
    - initialize react project with create-react-app
    - project structure: organize project into major components, assets, and utility folders

#### 2. Build UI
    - create required components
    - implement the image upload feature through a file input element
    - develop a control panel for user settings/sorting parameters
#### 3. Build out Canvas and pixel-sorting logic
    - use the <canvas> element to display uploaded image
    - implement the pixel-sorting algorithm as a javascript function that can be imported into the react component
    - connect the GUI control panel to dynamically update the image processing parameters
#### 4. Manage State and Data Flow
    - Use useEffect, useRef, and useState hooks to manage and update the various states (uploaded image, control panel values, image processing)
    - Find way of handling data flow between parent and child components throughout the image manipulation process and during control panel changes
#### 5. Render the Processed Image
    - use the Canvas API to draw the processed image onto the canvas whenever the image or control parameters change
#### 6. Testing/Debugging 
    - test all components individually and test entire app to make sure they work as expected
    - debug using the browser dev tools and React Developer tools
    - get users to test, implement necessary changes based on user feedback and research
#### 7. Styling
    - use Sass styling to create a user-friendly interface
    - make site responsive, possibly create a mobile version
#### 8. Deploy (?)
    - this would possibly happen on Heroku
#### 9. Optimize
    - I may not know enough to make this fully optimized, but I'll try 

## Nice-to-haves

Your project will be marked based on what you committed to in the above document. Under nice-to-haves, you can list any additional features you may complete if you have extra time, or after finishing.

#### Nice-to-haves:
    User profiles/
    Video manipulation
    Links to share to social media platforms
