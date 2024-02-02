// factory method:

// abstract product
interface AnimConfig {

    init(): any

}

// concrete product 1
class CamAnimConfig implements AnimConfig {

    init(): any {}
}

// concrete product 2
class ModelAnimConfig implements AnimConfig {

    init(): any {}

}




// abstract creator
abstract class Obj3D {

    // public abstract factoryMethod(): Product;
    public abstract createAnimConfig(): AnimConfig 

    render() {
        
        // Call the factory method to create a Product object.
        const animConfig = this.createAnimConfig();

        // Now, use the product.
        animConfig.init()

    }

}

// concrete creator 1
class Camera extends Obj3D {

    // factoryMethod implementation 1 
    createAnimConfig(): AnimConfig {

        return new CamAnimConfig()

    }


}

// concrete creator 2
class Model extends Obj3D {

    // factoryMethod implementation 2
    createAnimConfig(): AnimConfig {
    
        return new ModelAnimConfig()

    }

}