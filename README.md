# 3D Textbook - Web App

### Project Description:
- 6protons.app is an eLearning minimum viable product (mvp). It is designed to teach math & science by visualizing abstract concepts using 3D models. The app in its current form focuses on carbon crystals, however the framework can be used to teach any STEM subject. 
### Live Build: 
- [https://6protons.app](https://6protons.app)

## Getting Started:

### Dev Environment Set-up:
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment below for notes on how to deploy the project on a live system.  

Instructions:
1. Download the source code by clicking the green "code" button at the top of this README file and click "Download Zip"  

    <!-- ![image](src/images/download-readme.jpg) -->

    <img src="./src/images/download-readme.jpg" style="width:200px;"/>


2. Next, using the command line, naviagate to the project directory.
    ```bash
    cd 3D-Textbook-master
    ``` 
3. Once you're in the project directory, install dependencies with:
    ```bash
    npm install
    ``` 
4. After dependecies have all finished installing, fire up a development server from the terminal with the following command: 
    ```bash
    npm start
    ``` 
5. Happy hacking!


## Architecture
- Single Page Application.
### File Tree
.
└── 3D-Textbook-master/
    ├── node_modules
    ├── public/
    │   ├── lesson1_models/
    │   │   ├── model0.glb
    │   │   ├── model2.glb
    │   │   ├── model3.glb
    │   │   ├── model4.glb
    │   │   └── model5.glb
    │   ├── lesson2_models/
    │   │   └── model0.glb
    │   ├── lesson3_models/
    │   │   └── model0.glb
    │   ├── lesson4_models/
    │   │   └── model0.glb
    │   └── home_models/
    │       └── steroid.glb
    ├── src/
    │   ├── components/
    │   │   ├── HomeNav.jsx
    │   │   ├── LessonNav.jsx
    │   │   └── Stars.jsx
    │   ├── images/
    │   │   ├── diamond.png
    │   │   ├── download-readme.jpg
    │   │   ├── fullerene.jpeg
    │   │   ├── graphene.jpg
    │   │   └── nanotube.jpeg
    │   ├── pages/
    │   │   ├── diamonds_lesson/
    │   │   │   ├── DiamondModels.jsx
    │   │   │   ├── DiamondLesson.jsx
    │   │   │   └── DiamondText.jsx
    │   │   ├── fullerenes_lesson/
    │   │   │   ├── FullereneModels.jsx
    │   │   │   ├── FullereneLesson.jsx
    │   │   │   └── FullereneText.jsx
    │   │   ├── graphene_lesson/
    │   │   │   ├── GrapheneLesson.jsx
    │   │   │   ├── GrapheneModels.jsx
    │   │   │   └── GrapheneText.jsx
    │   │   ├── home/
    │   │   │   ├── Card.jsx
    │   │   │   ├── homes-stles.css
    │   │   │   ├── Home.jsx
    │   │   │   └── Models.jsx
    │   │   └── nanotubes_lesson/
    │   │       ├── NanotubeModels.jsx
    │   │       ├── NanotubesLesson.jsx
    │   │       └── NanotubeText.jsx
    │   ├── redux/
    │   │   ├── actions/
    │   │   │   └── index.js
    │   │   ├── reducers/
    │   │   │   └── index.js
    │   │   └── store.js
    │   ├── App.jsx
    │   ├── global-styles.css
    │   └── index.js
    ├── package-lock.json
    ├── package.json
    ├── README.md
    └── .gitignore





# Technologies 
- JavaScript
- React
- Redux
- Three.JS / React-3-Fiber
- Blender



# Deployment
Add additional notes about how to deploy this on a live system


# Authors
- Bhav Dhillon - Designer && Engineer

# License 
- MIT

# Acknowledgements



>Block Quote
