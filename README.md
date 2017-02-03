# Immutable Mapper

Mapping two immutable objects into one.

Usually used in a Redux app with Normalizr where there is an object from state and another object from action.
They can be merged into one from a pre-defined set.

## Usage

```js
import immutableMapper from 'immutable-mapper';

const sets = [
  ['result'],
  ['entities', 'announcement'],
  ['entities', 'author']
];

const mappedObject = immutableMapper(sets, firstImmutableObject, secondImmutableObject);
```

Make sure that the two object has same data structure. Sets from above means the Immutable object has
```json
{
  result,
  entities: {
    announcement,
    author
  }
}
```
as data structure.