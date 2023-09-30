
TODO: 

Place text underneath the model. Centered.
Fade in the animation for the text. 

Get section 2 --> section 3 model behaving properly. Section should move from 2 to 3 without animation being disrupted
    Try to pass the time of animation of section 2 into section 3's model

Work out all animations and transitions.
    0. Need to add rotation around bucky-ball? ---> Is this necessary? Could look really cool, but where would the text go?
        0. Re-learn animation system. Whats inside a "track" again?
        2. Get the vector3 for the point that is 90 degrees away for position[3]?

    1. Create glowing soccer-ball pattern animation.


Add ability to go backwards.


All buckyball's material needs to be shifted to black. Glossy black? --> Same as diamon thumbnail, glossy dark purple











------------------------
------------------------
------------------------

Hook back into home page. 

Make sure all other lessons are working.

Add section 1 to Diamond lesson with the Diamon Lattice from Blender. 

Create message to let users know only Buckminsterfullerene lesson is finished.

--------------------------


Change voice 1 ("gas" needs to end less abruptly)...might cost $50 though.




// Add sound effects between camera movements, perhaps a whoosh of some kind, but obviously fitting the space theme.
// Need to refine jank on fullerene opening animation. Tai can likely help here. Its likely a garbage collection bottleneck. I believe frames have 8ms to render to not have any jank @120fps.



Section 0: Suspended in solution
    animationIn: Good - zoom in slowly

Section 1: 1985
    animationIn: Good - zoom back and rotate up

Section 2: Most symmetrical form of pure carbon ever discovered. 
    animationIn:  zoom back in and rotate back down.

    Text needs to be added.

Section 3: Soccer ball pattern. 
    animationIn: none. soccer ball pattern just gets highlighted.

    Text needs to be added. 

Section 4: Doping 
    animationIn: camera just rotates to the left. buckyball shrinks down. --> Change to just zoom back with buckyball shrinking.

Section 5: Application Example: HIV-1-Protease Inhibitor as a cure for HIV
    animationIn: 








------------------------------------
9.14.23
------------------------------------
Refactor some init functions into methods 
    initializeModelPositionsFromCamera --> method ..but where? not on each model{} --> top level of uninitializedData?
    CreateAnimationActions --> method...but where should we place the definition? --> top level of uninitializedData?

Fully understand codebase
    Need to understand Models, Camera and their Animation systems.