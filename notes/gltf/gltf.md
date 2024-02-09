

Buckminsterfullerene.JSON size = 847 KB;

It seems like glTF was designed to have fast loading and rendering. Perhaps we don't need to load this server-side, we can just
send out assets to the client as glTF binaries, .glb. I think this is what the format was designed for, as it is a transmission format.

"glTF™ is a royalty-free specification for the efficient transmission and loading of 3D scenes and models by engines and applications. glTF minimizes the size of 3D assets, and the runtime processing needed to unpack and use them."


loaded gltf as a blob is: 3,347,229 bytes --> 3347.229 kb --> 3.3 mb
                          
loaded meshes as a blob is: 3,193,000 bytes --> 3193.789 kb --> 3.1 mb
source: 
    function getObjectSize( obj: any ) {
      const jsonString = JSON.stringify(obj);
      if (jsonString) {
        return `loaded gltf is ${( new Blob([jsonString]).size / 1000 )} kilobytes` ; // Blob size is more accurate for byte size
      }
      return 0; // Returns 0 if obj is undefined or circular, etc.
    }
;


SIZE OF 1 MODELS MESHES 3193.789 kilobytes --> 3.1 mb
source:
    const _initializedPages = await initialize( uninitializedData );

    const oneModelsMeshes = _initializedPages[0].models[0].loadedMeshes

    function getObjectSize( obj: any ) {
      const jsonString = JSON.stringify(obj);
      if (jsonString) {
        return `${( new Blob([jsonString]).size / 1000 )} kilobytes` ; // Blob size is more accurate for byte size
      }
      return 0; // Returns 0 if obj is undefined or circular, etc.
    }

    console.log( "SIZE OF 1 MODELS MESHES", getObjectSize( oneModelsMeshes ) );
;


original .glb is 59 kb

That means the .glb is 1.76% the size of the gltf blob and roughly 2% the size of meshes. 

It is better, therefore, to keep the 3D assets on the server as binaries for faster network transmission. The binaries can be 
unpacked and rendered on the front-end by the client.


## A glTF when loaded is comprised of the following 5 properties: 
    animations: Array<THREE.AnimationClip>
    asset: Object
    cameras: Array<THREE.Camera>
    scene: THREE.Group
    scenes: Array<THREE.Group>

## After loading the gltf:
    gltf.animations; // Array<THREE.AnimationClip>
    gltf.scene; // THREE.Group
    gltf.scenes; // Array<THREE.Group>
    gltf.cameras; // Array<THREE.Camera>
    gltf.asset; // Object

## 2 additional propeties are seen in the console.log:
    parser:
    userData:





# Move to Vision Programming MD Note on Bear:

    # Converting GLTF for VisionOS
        Reality Converter is made by Apple: https://developer.apple.com/augmented-reality/tools/
        usdzconvert is a Python script that converts the following assets into usdz:
        GLTFKit2 is another Swift/C script to convert GLTF's to Reality objects


