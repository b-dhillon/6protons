
# OOP REFACTOR:
## To-do:

## Finish implementing Camera.createAnimationClips();
- Should this be in a AnimationClipFactory?

  - implement translate-circle-oo.ts

## Finish writing all methods for Model

- Write out all the design patterns that will be used.
  - Builder Pattern?
  - Factory Pattern for AnimationClips




- Learn proper best-practices error handling --> Best practices for Try/Catch and when to throw errors.

















# More To-do:
- Write tests

- Re-factor the animation controllers for Models and Camera
- Get mixers of models down from 4 to 2 --> should increase performance if they are all different mixers
- Compile all types and interfaces.




# Cleaning 
- Remove unnecessary comments
- Make functions hold to SRP







 

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




