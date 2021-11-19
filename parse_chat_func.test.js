// Jest framework in order to test the correct functions
const { test } = require('@jest/globals');
const parse_chat_func = require('./parse_chat_func');

// test('Identity test', () => {
//   expect(parse_chat_func('Ciao')).toBe('Ciao');
// });

test('Test first exercise -- simple sentence', () => {
  const obj = eval("[{ date: '14:24:32', mention: '14:24:32 Customer :', sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', type: 'customer'}]" );
  console.log("Expected:")
  console.log(obj)
  const str_test_1 = "14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  expect(parse_chat_func(str_test_1)).toStrictEqual(obj);

});

test('Test second exercise -- two sentences', () => {
  let obj = eval("[{date: '14:24:32', mention: '14:24:32 Customer :', sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', type: 'customer'}, { date: '14:26:15', mention: '14:26:15 Agent :', sentence: 'Aliquam non cursus erat, ut blandit lectus.', type: 'agent'}]");
  //console.log("Expected:");
  //console.log(obj);
  const str_test_2 = "14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n14:26:15 Agent : Aliquam non cursus erat, ut blandit lectus."
  expect(parse_chat_func(str_test_2)).toStrictEqual(obj);

});

test('Test Third exercise -- two customer mentions as start', () => {
  
  let obj = eval("[{\
    date: '14:24:32',\
    mention: '14:24:32 Customer :',\
    sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',\
    type: 'customer'\
  }, {\
    date: '14:27:00',\
    mention: '14:27:00 Customer :',\
    sentence: 'Pellentesque cursus maximus felis, pharetra porta purus aliquet viverra.',\
    type: 'customer'\
  }, {\
    date: '14:27:47',\
    mention: '14:27:47 Agent :',\
    sentence: 'Vestibulum tempor diam eu leo molestie eleifend.',\
    type: 'agent'\
  }, {\
    date: '14:28:28',\
    mention: '14:28:28 Customer :',\
    sentence: 'Contrary to popular belief, Lorem Ipsum is not simply random text.',\
    type: 'customer'\
  }]");
  
  console.log("Expected:");
  console.log(obj);
  let str_test_3 = "14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n14:27:00 Customer : Pellentesque cursus maximus felis, pharetra porta purus aliquet viverra.\n14:27:47 Agent : Vestibulum tempor diam eu leo molestie eleifend.\n14:28:28 Customer : Contrary to popular belief, Lorem Ipsum is not simply random text."
  console.log(str_test_3)
  expect(parse_chat_func(str_test_3)).toStrictEqual(obj);

});

test('Test Forth exercise -- date splitting', () => {
  
  let obj = eval("[{\
    date: '14:24:32',\
    mention: '14:24:32 Customer :',\
    sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',\
    type: 'customer'\
  }, {\
    date: '14:26:15',\
    mention: '14:26:15 Agent :',\
    sentence: 'Aliquam non cursus erat, ut blandit lectus.',\
    type: 'agent'\
  }]");
  
  console.log("Expected:");
  console.log(obj);
  let str_test_4 = "14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.14:26:15 Agent : Aliquam non cursus erat, ut blandit lectus."
  console.log(str_test_4)
  expect(parse_chat_func(str_test_4, 'date')).toStrictEqual(obj);

});

test('Test Fifth exercise -- ignore extra dates', () => {
  
  let obj = eval("[{\
    date: '14:24:32',\
    mention: '14:24:32 Customer :',\
    sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',\
    type: 'customer'\
  }, {\
    date: '14:26:15',\
    mention: '14:26:15 Agent :',\
    sentence: 'I received it at 12:24:48, ut blandit lectus.',\
    type: 'agent'\
  }]");
  
  console.log("Expected:");
  console.log(obj);
  let str_test_5 = "14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.14:26:15 Agent : I received it at 12:24:48, ut blandit lectus."
  console.log(str_test_5)
  expect(parse_chat_func(str_test_5, 'date')).toStrictEqual(obj);

});


test('Test Fifth exercise -- ignore extra dates', () => {
  
  let obj = eval("[{\
    date: '14:24:32',\
    mention: '14:24:32 Customer :',\
    sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',\
    type: 'customer'\
  }, {\
    date: '14:26:15',\
    mention: '14:26:15 Agent :',\
    sentence: 'I received it at 12:24:48, ut blandit lectus.',\
    type: 'agent'\
  }]");
  
  console.log("Expected:");
  console.log(obj);
  let str_test_5 = "14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.14:26:15 Agent : I received it at 12:24:48, ut blandit lectus."
  console.log(str_test_5)
  expect(parse_chat_func(str_test_5, 'date')).toStrictEqual(obj);

});

test('Test Sixth exercise -- full name', () => {
  
  let obj = eval("[{\
    date: '14:24:32',\
    mention: '14:24:32 Luca Galasso :',\
    sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',\
    type: 'customer'\
  }, {\
    date: '14:26:15',\
    mention: '14:26:15 Emanuele Querzola :',\
    sentence: 'I received the package, ut blandit lectus.',\
    type: 'agent'\
  }]");
  
  console.log("Expected:");
  console.log(obj);
  let str_test_5 = "14:24:32 Luca Galasso : Lorem ipsum dolor sit amet, consectetur adipiscing elit.14:26:15 Emanuele Querzola : I received the package, ut blandit lectus."
  console.log(str_test_5)
  expect(parse_chat_func(str_test_5, 'date')).toStrictEqual(obj);

});

test('Test Seventh exercise -- missing colon after the names', () => {
  
  let obj = eval("[{\
    date: '14:24:32',\
    mention: '14:24:32 Customer',\
    sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',\
    type: 'customer'\
  }, {\
    date: '14:26:15',\
    mention: '14:26:15 Agent',\
    sentence: 'I received it at 12:24:48, ut blandit lectus.',\
    type: 'agent'\
  }]");
  
  console.log("Expected:");
  console.log(obj);
  let str_test_5 = "14:24:32 Customer Lorem ipsum dolor sit amet, consectetur adipiscing elit.14:26:15 Agent I received it at 12:24:48, ut blandit lectus."
  console.log(str_test_5)
  expect(parse_chat_func(str_test_5, 'date')).toStrictEqual(obj);

});


