# Easy Field-AutoComplete
Easily turn any text input into a searchable field using Fuse library.

This tutorial is meant for Unbounce but it can be easily replicated for any other case.

1. Add jQuery with the script tag **```<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>```** before the ```</body>```. 


2. Copy the fuse.js script tag **```<script src="https://unpkg.com/fuse.js@2.5.0/src/fuse.min.js"></script>```** and paste it just between the ```<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>``` and ```</body>```.



## Good, now we only need to initialize the library

3. Go to your main javascript file and initialize the library as follows:
fieldAutocomplete.init({fields: SELECTOR, data: LIST});
where:

SELECTOR is a CSS selector. Example: "#input_id", ".input_class". For more information about CSS selectors, visit this [web page](https://www.w3schools.com/cssref/css_selectors.asp.)


And LIST is an array of objects containing searchable data. Example: 

```
[
  {
    name: "apples",
    description: "red and rounded"  
  },
  {
    name: "bananas",
    description: "yellow and large"
  }
]
```

For example, to initialize a text input with an **ID "#field-1"** which search a selection of fruits, do the following:

```
fieldAutocomplete.init({
    fields: '#from', 
    data: [
            {
              name: "apples",
              description: "red and rounded"  
            },
            {
              name: "bananas",
              description: "yellow and large"
            }
          ]
  })
```

You can also target multiple fields, by simply separating them by comma, like this:
```
fieldAutocomplete.init({
    fields: '#field-1', '#field-2', '#field-3', 
    data: [
            {
              name: "apples",
              description: "red and rounded"  
            },
            {
              name: "bananas",
              description: "yellow and large"
            }
          ]
  })
```

**Note**: always, make sure to write fields´s values between quotes (single o doubles ones, doesn´t matter).


## NOW GO AND MAKE YOUR USER EXPERIENCE MORE COMFORTABLE FOR YOUR USERS.
