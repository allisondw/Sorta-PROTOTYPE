# Sorta_pixel-sorting
A GUI for live-rendered pixel-sorting; image manipulation

## Sorta
Sorta is a UI for creating glitch art by manipulating uploaded images using pixel-sorting, 
    with real-time previews of the images as they are being edited. 

### Problem
Pixel-sorting can be tricky and users may not have the tools they need to manipulate the images 
    they want while seeing the results in real-time. 
    My app will provide an intuitive interface that simplifies the process, 
    allowing users to experiment and create glitch art without the need for in-depth programming knowledge.

### User Profile
Artists, designers, and hobbyists interested in digital art 
    and glitch aesthetics will find this app particularly useful. 
    It is designed to handle JPEG and PNG files to accommodate a wide range 
    of image formats used by the target audience.

### Features

#### Image upload: 
Users can upload JPEG and PNG files to apply the pixel-sorting

#### Pixel-sorting algorithm: 
A dynamic rendering of pixel-sorting effects as users adjust settings

#### Customizable Sorting Parameters: 
Tools to adjust various aspects of the pixel-sorting algorithm, such as orientation and sorting method.

#### Gallery of User-Created Images
Lets users save their created images to a gallery to browse through later


### Tech Stack

#### React: 
+for building the UI

#### Axios:
+for making calls to the API

#### Node.js/Express:
+for the backend server

#### HTML Canvas API: 
+for the real-time canvas feature, rendering the sorted pixels on the front-end

#### Multer:
+for saving/serving files


### Sitemap


#### Create Page: 
Where users upload, manipulate, and download their images

#### Gallery Page:
Gallery of images created by the user

#### Image Page:
Selected image with settings used to create it


### Endpoints

#### POST /upload: 
##### Receives the image file from the user
    - parameters: 'imageFile'
    - example response: { success: true, message: "Image upload complete" }

#### GET /gallery
##### Retrieves all saved images from user
    - parameters: 'userId/username'
    - example response: { success: true, images: [<list-of-gallery-images>] }

#### GET /image
##### Retrieves selected image from gallery
    - parameters: 'imageId'
    - example response: { success: true, image: [<image>] settings: <settings> }

#### POST /save
##### Saves a created image to the user's gallery
    - parameters: 'userId/username', 'imageData'
    - example response: { success: true,  message: 'Image saved' }

## Sprint Roadmap

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
    - this would possibly happen with Heroku/S3
#### 9. Optimize
    - Lots to learn in order ot fully optimize

## Next Steps

#### Mobile iOS appplication
    - I'd like to take this prototype and transform it from the CRUD-focused SPA it is now to a mobile digital art tool available initially through the App store, then for Android users as well. 
