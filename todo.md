## Next Push
- Refactor 
      - Create a whole new version of this project. Add typescript?
      - Turn blackFade into 1 fn
      - Try to make everything as purely function as possible. Check if this impacts performance first.
            - Consensus semms to be that fxn calls cost very little. 
      - Clean up console log statements and warnings.
      - Compress thumbnail tiles from 1mb + to 200 or so kb
      - Compress music too?
      - Finish fixing caching of star points




- Figure out new camera movement.

- Fix flipped model bug.

- Add animation to text.
- Add voice over for text.




- Fix context-lost bug -- seems to be losing context to the canvas of the previous page
- Cache all your models with useLoader();


Figure out if blender animations are more performant then useFrame?

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