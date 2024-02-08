### Introduction
Generator functions in JavaScript are very powerful, they allow us to pause the execution of the function and then return anytime you like. They can return, or `yield` multiple values.  Generators can also help us make our asynchronous code mode readable.

In this lesson, you will learn how generator functions are created, iterated,  and in the reading material provided later you will learn other useful features of generators such as asynchronous generators, delegation and error handling.

### Lesson overview
This section contains a general overview of topics that you will learn in this lesson.

- Discuss what a generator function is.
- Explain how to iterate through a generator function.
- Understand how to compose generators into each other.
- Explain what generators are useful for.
- Describe how to pass a variable inside of a generator.
- Understand how to write asynchronous generator functions.

### Generator functions
Generator functions are straightforward to declare. All we need to do is to append an asterisk `*` at the end of the `function` keyword.

```javascript
function* isPalindrome() {}
```

Usually, functions will run to completion when called and `return` a value. For simplicity, lets take this function which checks if a given string is a palindrome.

```javascript
function isPalindrome(string) {
	const split = string.split("");
	const reversed = split.reverse();
	const joined = reversed.join("");
	return joined === string;
}
```

If we run it, it will instantly execute the function. 

```javascript
const myStr = "generator";
console.log(isPalindrome(string)) // False
```

We don't get to stop the function at any stage of the process. But generators are different, they do not return a value immediately. Instead, every time a generator function is called, it returns a special `Generator` object that includes the value of the generator function and whether it is complete or not.

For example, let's rewrite our regular function using a generator function instead:
```javascript
function* isPalindrome(string) {
	const split = string.split("");
	yield split;
	const reversed = split.reverse();
	yield reversed;
	const joined = reversed.join("")
	yield joined;
	return joined === string;
}
```

You may have noticed the `yield` keyword. Put it simply, it is similar to the `return` keyword but it doesn't stop the execution of the function. Only generator functions have this ability.

Now lets invoke it:

```javascript
const myStr = "generator";
const generator = isPalindrome(myStr);
console.log(generator);
```

With a regular function, we would expect the output to be `true`. However, we get this strange `Object [Generator]` thing:

```js
Object [Generator] {}
```

Instead of returning a value, a generator function returns an **iterator**. 
- An iterator is simply an object that has a `next()` method. 
- When we call the `next()` method on an iterator, it returns an object with `value` and `done` properties.
- The `done` property is either `true` when the iterator hasn't been fully iterated over, or `false` otherwise.
- `value` property indicates the returned value at each stage of iteration through the iterator.

### Let's see this in action
We can call the `next()` method on our `generator` like this:
```javascript
generator.next();
```

We get an object containing the `value` and `done` properties.

```javascript
// Output 1
{
  value: [
    'g', 'e', 'n',
    'e', 'r', 'a',
    't', 'o', 'r'
  ],
  done: false
}
```

When we call `.next()`, JavaScript finds the next `yield` keyword, and returns that in the object we get.  

If we call the `.next()` method a few more times, we will get the return value of the next `yield` statement. JavaScript "remembers" how many times we have previously called the `.next()` method on a given generator. We can directly access the `value` property like we would with a regular object.

```javascript
generator.next().value;
generator.next().value;
```

```javascript
// Output 2
[
  'r', 'o', 't',
  'a', 'r', 'e',
  'n', 'e', 'g'
]

// Output 3
rotareneg
```

Finally, let's call the generator `.next()` method once more:
```javascript
generator.next();
```

```javascript
{ value: true, done: true }
```

As you can see, the `done` property of the iterator object output by the generator is now `true`, meaning that all `yield` statements and the final `return` statement have been returned.

**Note**: The `return` statement is not required. We can replace it with another `yield`, but if we do this then instead of returning `{ value: true, done: true }`, it will return `{ value: true, done: false }` and any subsequent calls to the `.next()` method will always return `{ value: undefined, done: true }`

### Iterating over a generator

It would be right to assume that calling the `.next()` method repeatedly is not efficient, thankfully generators are iterable themselves, so we can iterate through every value of our generator using a `for...of` loop:

```javascript
for (const value of generator) {
	return value;
}
```

We get the following output:
```javascript
[
  'g', 'e', 'n',
  'e', 'r', 'a',
  't', 'o', 'r'
]
[
  'r', 'o', 't',
  'a', 'r', 'e',
  'n', 'e', 'g'
]
generator
```

The above shows 3 of 4 return values of our generator. Since we are iterating through it, the `return` statement is ignored in the iteration. To get the output we have to change the `return` keyword to `yield`. Then the iteration will work correctly.

```javascript
yield joined === string;
```

### Exiting a generator

However, instead of changing the last `yield` value to a `return` what we can do instead is call a `return()` method.

```javascript
generator.next();
generator.return("Exit generator");
generator.next();
```
Output:
```javascript
// Output 1
{
[
  'g', 'e', 'n',
  'e', 'r', 'a',
  't', 'o', 'r'
],
  done: false
}
// Output 2
{ value: 'Exit generator', done: true }
// Output 3
{ value: undefined, done: true }
```

As you can see, the `value` property will be whatever we pass into `return()` when calling it, and is automatically set to `true`. `return()` forces the generator object to complete and ignore any other `yield` keywords. Further calls to `.next()` will all return `{ value: undefined, done: true }`.

This is particularly useful in asynchronous programming when you need to make functions cancelable, such as interrupting a web request when a user wants to perform a different action, as it is not possible to directly cancel a Promise.

### Assignment

1. Watch [this video](https://www.youtube.com/watch?v=IJ6EgdiI_wU) by Web Dev Simplified as video form overview of this lesson.
1. [This article by DigitalOcean](https://www.digitalocean.com/community/tutorials/understanding-generators-in-javascript) goes over what we've learnt as well as diving into deeper topics such as yield delegation, infinite data streams and asynchronous generators.
1. javascript.info has a very in-depth section on generators. Check out these two articles below, and make sure to do the exercises at the bottom to really solidify your knowledge.
     - [This article on generators](https://javascript.info/generators)
     - [The article on asynchronous generators](https://javascript.info/async-iterators-generators)
1. Read the [MDN specification](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) on generators.

### Knowledge check

- How do you write a generator function?
- How do you iterate through a generator? 
- How do you compose generators into each other?
- What are generators useful for?
- How can you pass a value inside of a generator?
- How do you write an asynchronous generator?

### Additional resources
This section contains helpful links to related content. It isn’t required, so consider it supplemental.

- If you want to go in-depth, watch this JS [conference on generators](https://www.youtube.com/watch?v=gu3FfmgkwUc) by Anjana Vakil
