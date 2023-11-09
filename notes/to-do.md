# To-do:

  # Commit and Push

  # Create new branch to re-factor createModelPosition 

  # Brainstorm prompt for LLM











  # Fix new bug -- model0 doesnt shrink when going forwards, after having gone backwards
    . I have a suspicion that the bug is caused by prevSection not updating until after camera finishes animating
      --> Doesnt make sense at first, because then wouldn't all of the backwards to forwards scaleOut's be messed up?

    . Or there is something weird going on in the references to the AnimationActions
        . We can re-factor it and remove the references, 
          use: forwards ? animationActions[ section - 1 ] : animationActions[ section + 1 ]

        --> Also doesnt make sense at first, because then wouldn't all of the backwards to forwards scaleOut's be messed up?


    . OR it is possible because of controller2 conditional if( !isCameraAnimating && section ) play scaleIn
      When going backwards to section0, that line above never executes





      











































      - Need to fix bug in createModelPosition that is making the model of section4 not appear in the proper location.
        - Log current position
        - Figure out what the real position is supposed to be 

        cameraPos: [ 4.75, 0, -3 ]

        expected: 
          modelPos: [ 3.75, 0, -3 ]
        
        observed: 
          modelPos: [ 3.17, 0.15, -4.58 ]

    Explaining Observed:
      cameraPos at section4 = [ 4.75, 0, -3 ]
      cameraRot at section4 = 1.58 
      offset = -1.58 
      x = 4.75 - 1.58 = 3.17
      y = 0 + 0.15    = 0.15
      z = -3 - -1.58  = -4.58
     


  # Redo styling of lessonText -- new font, new font-size, line-height and everything.







































## Next:
  # Clean and refactor.
  # Rebuild Home page.
  # Add/rethink music.
  # Find better chime.
  # Get all other lessons working.
  # Add diamond lattice to diamond model -- essentially build section1 of the diamond lesson.
  # Add re-direct buttons to all lessons.
  # Create diagrams + update readme.md on GitHub.




