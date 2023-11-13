# To-do:


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




