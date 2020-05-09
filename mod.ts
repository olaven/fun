
export const fun = <T> (value: T) => ({
    
    map: <G> (action: (v: T) => G) => 
        fun(action(value)),

    apply: (action: (v: T) => T) => 
        fun(action(value)),

    run: (action: (v: T) => void) => {
        
        action(value); 
        return fun(value);
    },
    
    get: () => value
});

