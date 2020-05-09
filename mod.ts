/**
 * Entry point for functional 
 * operations on a given value. 
 * @param value 
 */
export const fun = <T> (value: T) => ({
    
    /**
     * The given function should 
     * map the valeu to another 
     * vlaue of different type 
     * @param
     */
    map: <G> (action: (v: T) => G) => 
        fun(action(value)),

    /**
     * The given function should 
     * map the valeu to another 
     * vlaue of the same type 
     */
    apply: (action: (v: T) => T) => 
        fun(action(value)),

    /**
     * Runs the given function 
     */
    run: (action: (v: T) => void) => {
        
        action(value); 
        return fun(value);
    },
    
    /**
     * Returns the value back
     */
    get: () => value
});