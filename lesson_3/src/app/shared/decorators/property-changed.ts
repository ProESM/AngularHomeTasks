export function propertyChanged(target: Object, propertyKey: string | symbol) {
    let propertyValue : any;
    
    let originalPropertyDescriptor = Object.getOwnPropertyDescriptor(target, propertyKey);

    Object.defineProperty(target, propertyKey,
    {
        get: function() {
            if (originalPropertyDescriptor != undefined && originalPropertyDescriptor.get != undefined) {
                return originalPropertyDescriptor.get.apply(this);
            } else {
                return propertyValue;
            }
        },
        set: function(value) {
            if (propertyValue != value) {
                console.log(`${target}.${propertyKey} = ${propertyValue}`);
            }
            
            if (originalPropertyDescriptor != undefined && originalPropertyDescriptor.set != undefined)
            {
                originalPropertyDescriptor.set.apply(this);
            } else {
                propertyValue = value;
            }
        }
    })
}