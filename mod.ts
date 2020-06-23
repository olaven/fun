type Action<T, G> = (v: T) => G;

//NOTE: type definition not used. Perhaps use if it makes the actual object readable.
type Fun<T> = (value: T) => {
    map: <G>(action: Action<T, G>) => Fun<G>;
    apply: (action: Action<T, T>) => Fun<T>;
    run: (action: Action<T, void>) => Fun<T>;
    if: <True, False> (
        predicate: Action<T, boolean>, 
        t: Action<T, True>, 
        f: Action<T, False>
    ) => Fun<True | False>;
    get: () => T;
};

/**
 * Entry point for functional 
 * operations on a given value. 
 * @param value 
 */
export const fun = <T>(value: T) => ({
  /**
     * The given function should 
     * map the valeu to another 
     * vlaue of different type 
     * @param
     */
  map: <G>(action: Action<T, G>) => fun(action(value)),

  /**
     * The given function should 
     * map the valeu to another 
     * vlaue of the same type 
     */
  apply: (action: Action<T, T>) => fun(action(value)),

  /**
     * Runs the given function 
     */
  run: (action: Action<T, void>) => {
    action(value);
    return fun(value);
  },

  //NOTE: perhaps both `t` and `e` should have to return the same type for predictability? not sure.
  if: <True, False>(
    predicate: Action<T, boolean>,
    t: Action<T, True>,
    e: Action<T, False>
  ) => predicate(value) ? fun(t(value)) : fun(e(value)),

  /**
     * Returns the value back
     */
  get: () => value,
});
