# fun
Utility library for functional programming in Deno   

## About 
This is a learning project I created because I wanted to understand some 
concepts in functional programming. Use the library if you want, but keep 
in mind that it is not meant to be anything serious. 

## Getting started 
One function is exported: `fun`. You pass a value to it. 
In return, it gives you functions to apply to your value. 

These functions are: 
`map`, `apply`, `run` and `get`. 

* `map` -> transform to new type 
* `apply` -> transform within same type 
* `run` -> run arbitrary code 
* `get` -> get your value back

See the example below: 
```typescript
import { fun } from "TODO URL" 

interface Person { name: string, salary: number }
const person: Person = { name: "joe", salary: 100 }; 

const format_salary = (person: Person) => 
    fun(person)
        .map(person => person.salary)
        .map(salary => salary.toString())
        .apply(salary => `${salary},-`)
        .get();

assertEquals("10,-", format_salary(person));
```