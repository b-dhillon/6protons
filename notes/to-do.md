
# OOP REFACTOR:

- Where should the .groupBySection() method be encapsulated?


- clean clean clean
  - Make final classes code look more like Three.JS core code. Very clean.
  - Come back to translate-circle-xz.ts and make it adhere more to SRP










# Thursday-Sunday To-Do:
- Figure out textPlacement and music initialization
- Animation Factory Method?
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




