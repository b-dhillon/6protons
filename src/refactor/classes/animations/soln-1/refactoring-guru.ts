// factory method:

// abstract product
interface Button {

    onClick(): any

}

// concrete product 1
class WindowsButton implements Button {

    onClick(): any {}
}

// concrete product 2
class HTMLButton implements Button {

    onClick(): any {}
}




// abstract creator
abstract class Dialog {

    // public abstract factoryMethod(): Product;
    public abstract createButton(): Button 

    render() {
        
        // Call the factory method to create a Product object.
        const okButton = this.createButton();

        // Now, use the product.
        okButton.onClick()


    }

}

// concrete creator 1
class WindowsDialog extends Dialog {

    // factoryMethod implementation 1 
    createButton(): Button {

        return new WindowsButton()

    }


}

// concrete creator 2
class HTMLDialog extends Dialog {

    // factoryMethod implementation 2
    createButton(): Button {
    
        return new HTMLButton()

    }

}