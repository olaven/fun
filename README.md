# Fun ![Test](https://github.com/olaven/fun/workflows/Test/badge.svg) [![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/raw.githubusercontent.com/olaven/fun/master/mod.ts) [![codebeat badge](https://codebeat.co/badges/7529200f-9cc1-4049-80f6-b3f4f06dfc4b)](https://codebeat.co/projects/github-com-olaven-fun-master)
Tiny utility library for functional programming in Deno/Deno   

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
// Node 
// - npm install fun-node
import { fun } from "fun-node"
// Deno 
import { fun } from "https://denopkg.com/olaven/fun" 

interface Person { name: string, salary: number }
const person: Person = { name: "joe", salary: 100 }; 

const format_salary = (person: Person) => 
    fun(person)
        .map(person => person.salary)
        .map(salary => salary.toString())
        .apply(salary => `${salary},-`)
        .get();

//prints 100,-
console.log(format_salary(person));
```