

# To-Do:

- Debug the output of lesson.json
  - Should we write a test for this?

- Test visually by piping the lesson.json into App.

- Merge all branches.

- Move new re-factored logic to a back-end server. 

- Connect front-end to back-end.


- Figure out textPlacement and music initialization


- Test, test, test, test.






















- Learn proper best-practices error handling --> Best practices for Try/Catch and when to throw errors.
  - Also: when to throw an error vs. when to throw an exception

- think about deploying the full on Factory Method pattern as an AnimationFactory 
  - that could support both model animations and camera animations?





# Front-end to-do:
- Re-factor the animation controllers for Models and Camera
- Get mixers of models down from 4 to 2 --> should increase performance if they are all different mixers


# Cleaning 
- Remove unnecessary comments
- Make functions hold to SRP
- Compile all types and interfaces.







 

## Next:
  # Clean, refactor, understand everything.
  # Rebuild Home page.
  
  # Add/rethink music.
  # Find better chime.
  # Get all other lessons working.
  # Add diamond lattice to diamond model -- essentially build section1 of the diamond lesson.
  # Add re-direct buttons to all lessons.
  # Redo styling of text? -- new font, new font-size, line-height?
  # Create diagrams + update readme.md on GitHub.
  # Fix new bug -- model0 doesnt shrink when going forwards, after having gone backwards





































# New Bug -- model0 doesnt shrink when going forwards, after having gone backwards

  . I have a suspicion that the bug is caused by prevSection not updating until after camera finishes animating
  --> Doesnt make sense at first, because then wouldn't all of the backwards to forwards scaleOut's be messed up?

  . Or there is something weird going on in the references to the AnimationActions
    . We can re-factor it and remove the references, 
      use: forwards ? animationActions[ section - 1 ] : animationActions[ section + 1 ]

  --> Also doesnt make sense at first, because then wouldn't all of the backwards to forwards scaleOut's be messed up?

  . OR it is possible because of controller2 conditional if( !isCameraAnimating && section ) play scaleIn
    When going backwards to section0, that line above never executes








# DONE:

- Animation Factory

  - Unify the creation of all animations. Camera animations and model animations. 

    # Create client-example-3.ts using the client example at the bottom of animation-factory.ts
    # Create example of Model and Camera using the Factory Method or Abstract Factory
    # Think about the Three.AnimationClipCreator name-space and the Strategy Pattern for createKeyframes

    2. Re-familiarize yourself with what is needed for all the different animations, such as TranslateRotate
       configs and TranslateCircle and Model animations too

       At its core, each clip needs: times[], values[], name, --> KeyframeTrack --> + duration --> AnimationClip

       # Translate Rotate:
        Config Variables:
          iPos: Vector3
          fPos: Vector3
          iRot: Euler
          fRot: Euler
          axis: string
          easing: string

        Anims:
          ZoomOut 
          ZoomIn
          CorkscrewUp
          ZoomOutRotateDown
          ZoomInRotateUp



       # Translate Circle:
        Config Variables:
          iPos: Vector3
          fPos: Vector3
          iRot: Euler
          fRot: Euler
          axis: string
          easing: string

          tMag

        Anims: 
          CircleModelCW


       # Model Animations
        Rotate: 
          iRot 
          fRot
          axis
          duration

        ScaleUp | ScaleDown | ScaleXYZ: 
          iScale
          fScale
          duration

        Suspend
          iPos 
          iRot
          duration