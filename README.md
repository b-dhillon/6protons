<p align="center">
    <img src="./readme_img/mainImg.jpg" style="width:700px;"/>
</p>

# 6 Protons

### Project Description:
- Six Protons is a VR minimum viable product. It is designed to teach organic chemistry via visualizing concepts using interactive 3D models embedded in a virtual universe. The project, in its current form, focuses on organic chemistry. However, once finished, this program will be scalable and allow for the creation of 3D lessons across a variety of STEM subjects. This application is very much still under development. It is currently being rewritten.

## User Interface Stills:
<p align="center">
    <img src="./readme_img/img-ui/ui-1.png" style="width:750px;"/>
    <img src="./readme_img/img-ui/ui-4.jpg" style="width:750px;"/>
</p>




## Application Structure:
### File System:
```
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
        │       └── model0.glb
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
```

## Architecture:

## Rendering Pattern: 


## Stack:
Front:
- TypeScript
- React
- WebGL 

Back:
- Node
- Express



<!-- ## Demo:

##### UI is responsive and scalable:
https://user-images.githubusercontent.com/88413313/190004640-e058fe2b-e85b-453f-bf7c-51be5e2a056b.mp4

##### And works with tablets as well: 
https://user-images.githubusercontent.com/88413313/190005139-403e5162-d019-4523-8d03-f6aa2287a619.mp4





## Dev Environment Set-up:
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

Instructions:
1. Download source code by clicking the green "code" button at the top of this README file and click "Download Zip"  

    <!-- ![image](src/images/download-readme.jpg) -->



<!-- 2. Next, using the command line, naviagate to the project directory.
    ```bash
    cd 3D-Textbook-master
    ``` 
3. Once you're in the project directory, install dependencies with:
    ```bash
    npm install
    ``` 
4. After dependecies have finished installing, boot up a development server from the terminal with the following command: 
    ```bash
    npm start
    ``` 
5. Happy hacking. -->



<!-- Removed: -->
<!-- <img src="./src/images/download-readme.jpg" style="width:300px;"/> -->
<!-- <img src="./readme_img/img-ui/ui-2.png" style="width:750px;"/> -->
<!-- <img src="./readme_img/img-ui/ui-3.png" style="width:750px;"/> -->
