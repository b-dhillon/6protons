

- Clean
- Understand & Memorize controllers

- Understand & Memorize init()
  - Break up init? or wait for the complete re-factor?











# Variables
didCameraMove -- sometimes we want multiple sections without moving camera at all. not even in a circle. Just revealing more of the model slowly

didModelMove -- instead of newModelLocation --> also should be able to compute this after computing modelPositions












# Work out implementation details without hard-coding
  
- Goal: 
create a new lesson with keyword new Lesson
Lesson will extend Page. 
 Lesson will have section(s) that you move through as a stack
 Lesson will have multiple models and multiple camera animations

I want to think up a lesson in my head. Break it up into sections in my head.
Have an LLM generate the text for each section. 
Create the models myself. 
Then just put the assets into a folder with a specific directory structure:
  . model.glb's
  . text
  . camera animation names, or camera path
  . model animation names
  . etc...



. How are the camera positions set? Hard-coded? 
. How do we know when to create a TranslateCircle vs. a TranslateRotate animation clip?
. Which fn's are methods? Which are utilities?
. Can we create a class for Page and a constructor, therefore we only have to 
      
      pages = Page[]
      pages.push( new Page( ...DataFromServer ) )





# Re-factor the animation controllers for Models and Camera



# Get mixers of models down from 4 to 2 --> should increase performance if they are all different mixers




# Compute model positions based on camera rotations only once
  . Model positions are computed inside initialize() in App() 

    However, we need them inside TranslateCircle(), which is called
    in initialize too, but called indirectly. initialize() calls data.createAnimationDS()
    and then passes the animationDS into data.createAnimationClips(), which then calls 
    animationClipConstructor() which then calls TranslateCircle()
    
    My current approach re-computes the model position inside TranslateCircle.
    This is a wasted computation, but might not be a big deal because it's cheap
.



## Functions to rewrite

# createModelPosition() rotation logic
 . Use what you learned from TranslateCircle
    . If y-axis: 
      use sin/cos in x/z plane
    . If x-axis
      use sin/cos in y/z plane 
    . If z-axis
      use sin/cos in x/y plane?? Or is nothing needed here since spinning a camera in the z-axis would turn it upside down?
.

# findRotationAxis()


