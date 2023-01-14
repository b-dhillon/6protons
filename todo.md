## Next Push

- Make every function only responsible for 1 thing (SRP) 
      - Turn blackFade into 1 fn








- Write a program that can take text out of a markdown file (or any text file) and turn it into div's with the proper class applied.
      This will allow you to crete new lessons programatically, simply type out the text and generate the 3D models and plug them in 
      the data structure and have the program generate the scene and lesson for you.

- Figure out new camera movement.

- Compress thumbnail tiles from 1mb + to 200 or so kb
- Compress music too?

- Add animation to text.
- Add voice over for text.

- Fix context-lost bug -- seems to be losing context to the canvas of the previous page
- Create a whole new version of this project, Next?



- Reasonging for switching from useFrame() to AnimationActions
    - This should enhance performance as the computations should be done ahead of time.
    - It will also increase animation control with .start(), .stop(), .clampWhenFinished() etc... methods on the AnimtionAction object. 
        - https://threejs.org/docs/#api/en/animation/AnimationAction
    - This will allow you to have central stores of data and a proper data pipeline.


### Optional
1. Add doped buckyball text.
2. Lerp the soccer pattern color change.
3. Trim * imports on Three.
4. Write your own inSphere method.





























-----

~~0. Get all animatons standardized.
~~1. Execute loading line by line so it happens in the order you need it. Understand line-by-line order of execution of every module.
~~2. Get font downloading faster.
~~3. Center the fullerene lesson properly and refactor all overlays into single function + re-add loading screen.
~~4. Refactor CSS overlay classes all into one seperate file.
~~5. Progammatically highlight the soccer-ball pattern
~~6. Get text-overlay officially centered
~~7. Get a new doped fullerene model --> Even Better: combine all 5 models into 1 and re-factor the entire model with instances. 
      Lesson-1-Before: 3500kb
      Lesson-1-After: 311kb    
      ~~Fix back button bug 
      ~~Fix soccer instance spheres
      ~~Fix last section of lesson overlay --> Get model to not show
~~8. Refactor home page hide/display sections,
~~9. Add fallback loading for all lessons too, not just the home page