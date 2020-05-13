import { assertEquals } from "./deps.ts";
import { fun } from "./mod.ts";
const { test } = Deno; 

test("can pass action to maps", () => {

    const original_value = 20; 
    fun(original_value)
        .run((value) => {

            assertEquals(value, original_value);
        })
});

test("can chain maps", () => {

    const result = fun(1)
        .map(value => value + 1)
        .map(value => value + 2)
        .map(value => {

            assertEquals(value, 4);
        });

    //assertEquals(result, 4);
}); 

test("map changes types", () => {

    fun(1)
        .map(value => value.toString())
        .run(value => {

            assertEquals(typeof value, "string");
            assertEquals(value, "1"); 
        });
}); 

test("creating function with apply", () => {

    const addTwo = (value: number) => 
        fun(value)
            .map(value => value + 2)
            .get(); 

    assertEquals(addTwo(1), 3);
}); 

test("Apply returns the same type", () => {

    const value = "I am a string";
    const uppercase = fun(value)
        .apply(value => value.toUpperCase())
        .get();

    assertEquals(value.toUpperCase(), uppercase);
}); 

test("Creating higher order function with apply and map", () => {

    interface Person { name: string, salary: number }
    const person: Person = { name: "joe", salary: 10 }; 

    const format_salary = (person: Person) => 
        fun(person)
            .map(person => person.salary)
            .map(salary => `${salary.toString()},-`)
            .get();

    assertEquals("10,-", format_salary(person));
});

test("Exact example from readme", () => {

    interface Person { name: string, salary: number }
    const person: Person = { name: "joe", salary: 10 }; 

    const format_salary = (person: Person) => 
        fun(person)
            .map(person => person.salary)
            .map(salary => salary.toString())
            .apply(salary => `${salary},-`)
            .get();

    assertEquals("10,-", format_salary(person));
});

test("Can call side-effect with `run`", () => {

    let side_effect_called = false
    const times_ten_and_format = (num: number) => 
        fun(num) 
            .apply(num => num * 10)
            .run(() => {side_effect_called = true})
            .map(num => `${num},-`)
            .get(); 

    assertEquals(side_effect_called, false);
    times_ten_and_format(10);
    assertEquals(side_effect_called, true);
});


test("Can call if-statement", () => {

    const is_positive = (num: number) => num >= 0; 
    const on_positive = (_: number) => "positive";
    const on_negative = (_: number) => "negative";

    const result_positive = fun(5)
        .if(is_positive, on_positive, on_negative)
        .get(); 

    const result_negative = fun(-1)
        .if(is_positive, on_positive, on_negative)
        .get()

    assertEquals(result_positive, "positive");
    assertEquals(result_negative, "negative");
});


test("Chaining ifs", () => {

    const is_positive = (num: number) => num >= 0;
    const is_negative = (num: number) => !is_positive(num);

    const returns_string = (_: number) => "some string";
    const returns_number = (_: number) => 1;

    const result_string = fun(3)
        .if(is_positive, returns_string, returns_number)
        .get()

    const result_number = fun(3)
        .if(is_negative, returns_string, returns_number)
        .get()
        
    assertEquals(typeof result_string, "string");
    assertEquals(typeof result_number, "number");
});