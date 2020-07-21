# Easy Field-AutoComplete
Easily turn any text input into a searchable field using Fuse library.

This tutorial is meant for Unbounce but it can be easily replicated for any other case.

1. Add jQuery
```<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>```

2. Add fuse
```<script src="https://unpkg.com/fuse.js@2.5.0/src/fuse.min.js"></script>```

3. Add the main code **Before the Body End Tag**


## Good, now we only need to target the correct elements

To use it, initialize it as follow:
fieldAutocomplete.init({fields: SELECTOR, data: LIST})
where:

SELECTOR is a jQuery selector.
LIST is an array of objects containing searchable data.

For example, to initialize a text input with an **ID "#from"**, do the following:

```fieldAutocomplete.init({fields: '#from', data: my-list})```

You can also target multiple fields, by simply separating them by comma, like this:
```fieldAutocomplete.init({fields: '#from, #to', data: my-list})```

or

```fieldAutocomplete.init({fields: '#field-id-1, #field-id-2, #field-id-3, #field-id-4', data: my-list})```
