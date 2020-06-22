const greetings = [
  'Node.js is Awesome!',
  'Node.js es impresionante!',
  'Node.js est génial!',
  'Node.js è fantastico!',
];

const getGreeting = () => {
  // generate random integer between 0 and greetings.length
  let random = Math.floor(Math.random() * greetings.length);

  // return value of greetings array at index random
  return greetings[random];
};

exports.greet = () => getGreeting();
