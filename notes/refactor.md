# Goal: 
Create a new lesson with keyword new Lesson
Lesson will extend Page. 
- Lesson will have section(s) that you move through as a stack
- Lesson will have multiple models and multiple camera animations

I want to think up a lesson in my head. Break it up into sections in my head.
Have an LLM generate the text for each section. 
Create the models myself. 
Then just put the assets into a folder with a specific directory structure:
- model.glb's
- text
- camera animation names, or camera path
- model animation names
- etc...

/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////


# Lesson Construction - Step by Step 
- instantiate new Lesson
- instantiate all Sections
- set camera startPosition, startRotation, and animationNames
- create all camPosRots
- create camera animationClipConfigs
- create Camera AnimationClips
- create all model positions
- create Model AnimationClips
- extract all GLTF Meshes


/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////


# METHODS NEEDING TO BE WRITTEN:

- Model.init()
  # Model.createPosition();
  # Model.createAnimationClips();
  # Model.initDependantProperties();
  
  set the rest of the properties that need to be set computationally
    id: 
    
    inNewPosition: boolean | undefined = true;
    yOffsetForText: number | undefined = 0;
    zoomInOnReverse: boolean | undefined = false;

    position: Vector3 | undefined;
    rotation: Vector3 | undefined;

- Lesson.init()
  Extract everything from the sections and store them as lists

- Lesson.set();
- Lesson.get();

- Section.init()
  Set camPosition and camRotation after Camera.createCamPosRots()


/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////


# Brainstorm -- camera.createPosRots():
pullOut( pMag, rMag )
- We likely just need to reverse the vector that looks out the camera frustrum
- In other words, a vector 180 degrees away. Then scale the vector by the tMag.

# Brainstorm -- Back-End:      
pages = Page[]
pages.push( new Page( ...DataFromServer ) )


/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////


# Implementation Questions: 

Q: How are the camera positions set? Hard-coded? 
  # A: by camera.createPosRots() method that uses the animation strings defined in Lesson.sections[ section ].camAnimation

Q: How do we know when to create a TranslateCircle vs. a TranslateRotate animation clip?
  # A: Based on the animation strings defined in Lesson.createSection() in the config property camAnimation: 

Q: Which fn's are methods? Which are utilities?


/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////


# Dependant Varaibles of a Lesson:

- model.inNewPosition:
  Initalizing Logic:
    if ( camera.animations[section] === 'circle-model' ) models[section][0].inNewPosition = false;


- model.yOffsetForText:
  Initalizing Logic:
    sectionParagraphs = lesson.paragraphs[section]
    sectionHasText = sectionParagraphs.length // boolean, no paragraphs should be an empty array NOT an empty string in the first index. 
    if (sectionHasText) model.yOffsetForText = 0.15
    else model.yOffsetForText = 0;


- model.zoomInOnReverse -- depends on if previous cameraAnimationName was 'zoomOut' or 'pullOut'
  Initalizing Logic:
    const prevCamAnimation = lesson.camera.animations[ section - 1 ];
    prevCamAnimation === 'zoom-out' ? true : false;


/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////









  














































## Functions to rewrite

// DONE:  ?
# createModelPosition() rotation logic
 . Use what you learned from TranslateCircle
    . If y-axis: 
      use sin/cos in x/z plane
    . If x-axis
      use sin/cos in y/z plane 
    . If z-axis
      use sin/cos in x/y plane?? Or is nothing needed here since spinning a camera in the z-axis would turn it upside down?
.