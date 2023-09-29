
TODO: 

0. Figure out where text is going to go
    Offset section 2 and 3 models y-position by 0.1 or so.
    Make section 2 and 3 models smaller. 
    Place text underneath the model. Centered.
    Fade in the animation for the text. 

1. Work out all animations and transitions for camera.
    0. Need to add spline rotation around bucky-ball????? ---> Is this necessary? Could look really cool, but where would the text go?
        0. Re-learn animation system. Whats inside a "track" again?
        1. Re-factor the TranslateRotate file.
        2. Get the vector3 for the point that is 90 degrees away for position[3]?
        3. Create a specific catmul-rom interpolation animationClip for that animation.

    1. Create glowing soccer-ball pattern animation.


Add text for all the sections.


Add ability to go backwards.


All buckyball's material needs to be shifted to black. Glossy black?











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