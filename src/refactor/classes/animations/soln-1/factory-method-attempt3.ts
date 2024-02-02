/**
 * With this approach every new animation will need: 
 *  1. new concrete AnimClip product 
 *        a. new createKeyframe implementation
 *        b. new createConfiguration implementation
 */



// Abstract Product:
interface AnimClip {

    makeKeyframes(): any

    makeConfiguration(): any


}

// Conrete Product:
class ZoomOutt implements AnimClip {
    
    makeKeyframes(): any {}

    makeConfiguration(): any {}


}


class CircleModel implements AnimClip {
    
    makeKeyframes(): any {}

    makeConfiguration(): any {}


}



// Abstract Creator: 
abstract class Obj3d {

    makeAnimation( clientSettings: any ) {

        const animation = this.createAnimation( clientSettings.animationName ); 

        animation.makeConfiguration();
        animation.makeKeyframes();


    }

    // Abstract Factory Method:
    abstract createAnimation( config: any ): AnimClip

};


// Concrete Creator
class Camera extends Obj3d {

   
    // Concrete Factory Method: 
    createAnimation( config: any ): any {

        if ( config.name === 'zoom-out' ) return new ZoomOutt();

        if ( config.name === 'circle-model' ) return new CircleModel();

    }


}


///////////////////////
/////// CLIENT ////////
///////////////////////

const clientSettings = {
    name: 'zoom-out',
    tMag: 3,
    rMag: 0
}


function client( creator: Obj3d ) {

    creator.makeAnimation( clientSettings )

}

