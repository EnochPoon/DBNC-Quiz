function printFooBar(num) {
  if (num % 14 === 0) console.log("foobar");
  else if (num % 2 === 0) console.log("foo");
  else if (num % 7 === 0) console.log("bar");
  else console.log(num);
}
