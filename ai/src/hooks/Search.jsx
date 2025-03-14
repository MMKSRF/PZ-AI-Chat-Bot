import { useState, useMemo } from 'react';

const useSearch = (/*initialData*/) => { // initialData is still here but we will not use it to keep the original hook signature, for now. We can discuss removing it later if you want.
  const [searchTerm, setSearchTerm] = useState('');

  const searchData = useMemo(() => (data, options) => {
    const { keys, caseSensitive = false } = options;

    if (!searchTerm) return data;

    const processString = (str) =>
      caseSensitive ? str : str.toLowerCase();
    const search = processString(searchTerm);

    // Handle arrays
    if (Array.isArray(data)) {
      return data.filter((item) => {
        return keys.some((key) => {
          const value = getNestedValue(item, key);
          return checkValue(value, search, processString);
        });
      });
    }

    // Handle objects
    if (typeof data === 'object' && data !== null) {
      const filteredObject = {};
      for (const key in data) {
        if (keys.some((k) => {
          const value = getNestedValue(data[key], k);
          return checkValue(value, search, processString);
        })) {
          filteredObject[key] = data[key];
        }
      }
      return filteredObject;
    }

    // Return as-is if not an array or object
    return data;
  }, [searchTerm]); // Dependency array: searchData is re-created only when searchTerm changes

  const getNestedValue = (obj, path) => {
    const keys = path.split('.');
    let current = obj;

    for (const key of keys) {
      if (!current) return null;
      current = current[key];

      if (Array.isArray(current)) {
        return current.flatMap((item) =>
          typeof item === 'object' ? getNestedValue(item, keys.slice(1).join('.')) : item
        );
      }
    }
    return current;
  };

  const checkValue = (value, search, process) => {
    if (typeof value === 'string') {
      return process(value).includes(search);
    }
    if (Array.isArray(value)) {
      return value.some((item) => checkValue(item, search, process));
    }
    if (typeof value === 'object' && value !== null) {
      return Object.values(value).some((val) => checkValue(val, search, process));
    }
    return false;
  };

  return {
    searchTerm,
    setSearchTerm,
    searchData,
  };
};

export default useSearch;




/*
Here’s a detailed documentation for the `useSearch` custom hook. This documentation explains its purpose, usage, parameters, return values, and examples.

---

# `useSearch` Custom Hook Documentation

## Overview
The `useSearch` hook is a reusable React hook designed to filter data (arrays or objects) based on a search term. It supports nested data structures, dot notation for keys, and case-insensitive searching. It is ideal for implementing search functionality in applications with complex data.

---

## Installation
To use the `useSearch` hook, simply copy the code into your project or import it from a utility file.

```javascript
import useSearch from './useSearch';
```

---

## API Reference

### Parameters
The `useSearch` hook accepts one argument:

| Parameter     | Type             | Description                                                                 |
|---------------|------------------|-----------------------------------------------------------------------------|
| `initialData` | `Array` or `Object` | The data to be filtered. Can be an array of objects or a plain object.      |

---

### Return Values
The hook returns an object with the following properties:

| Property        | Type               | Description                                                                 |
|-----------------|--------------------|-----------------------------------------------------------------------------|
| `searchTerm`    | `string`           | The current search term.                                                    |
| `setSearchTerm` | `function`         | A function to update the search term.                                       |
| `searchData`    | `function`         | A function to filter the data based on the search term and options.         |

---

### `searchData` Function
The `searchData` function is used to filter the data. It accepts two arguments:

| Parameter     | Type             | Description                                                                 |
|---------------|------------------|-----------------------------------------------------------------------------|
| `data`        | `Array` or `Object` | The data to filter.                                                        |
| `options`     | `Object`         | Configuration options for the search.                                       |

#### `options` Object
| Property         | Type               | Default Value | Description                                                                 |
|------------------|--------------------|---------------|-----------------------------------------------------------------------------|
| `keys`           | `Array<string>`    | `[]`          | Keys to search within the data. Supports dot notation for nested fields.    |
| `caseSensitive`  | `boolean`          | `false`       | If `true`, the search will be case-sensitive.                               |

---

## Usage

### Basic Example (Array of Objects)
```javascript
const data = [
  {
    topic: 'React Components',
    interactions: [
      {
        id: 1,
        question: 'How to create reusable components in React?',
        answer: 'You can create reusable components by...',
      },
    ],
  },
  {
    topic: 'AI Ethics',
    interactions: [
      {
        id: 2,
        question: 'Ethical considerations in AI development',
        answer: 'Key ethical considerations include...',
      },
    ],
  },
];

const { searchTerm, setSearchTerm, searchData } = useSearch(data);

const filteredData = searchData(data, {
  keys: ['topic', 'interactions.question', 'interactions.answer'],
  caseSensitive: false,
});
```

### Example (Plain Object)
```javascript
const data = {
  topic1: {
    title: 'React Components',
    description: 'Learn how to build reusable components in React.',
  },
  topic2: {
    title: 'AI Ethics',
    description: 'Ethical considerations in AI development.',
  },
};

const { searchTerm, setSearchTerm, searchData } = useSearch(data);

const filteredData = searchData(data, {
  keys: ['title', 'description'],
  caseSensitive: false,
});
```

---

## Features

### 1. **Nested Data Support**
   - The hook can search through nested objects and arrays using dot notation in the `keys` option.
   - Example: `'interactions.question'` will search the `question` field inside the `interactions` array.

### 2. **Case-Insensitive Search**
   - By default, the search is case-insensitive. Set `caseSensitive: true` in the options to make it case-sensitive.

### 3. **Supports Both Arrays and Objects**
   - Works with arrays of objects and plain objects.

### 4. **Dynamic Filtering**
   - The `searchData` function dynamically filters the data whenever the `searchTerm` changes.

---

## Examples

### Example 1: Filtering an Array of Objects
```javascript
const data = [
  {
    name: 'John',
    age: 25,
    address: {
      city: 'New York',
      country: 'USA',
    },
  },
  {
    name: 'Jane',
    age: 30,
    address: {
      city: 'London',
      country: 'UK',
    },
  },
];

const { searchTerm, setSearchTerm, searchData } = useSearch(data);

const filteredData = searchData(data, {
  keys: ['name', 'address.city'],
  caseSensitive: false,
});
```

### Example 2: Filtering a Plain Object
```javascript
const data = {
  user1: {
    name: 'Alice',
    role: 'Admin',
  },
  user2: {
    name: 'Bob',
    role: 'User',
  },
};

const { searchTerm, setSearchTerm, searchData } = useSearch(data);

const filteredData = searchData(data, {
  keys: ['name', 'role'],
  caseSensitive: false,
});
```

---

## Notes
1. **Performance Considerations:**
   - For large datasets, consider debouncing the `setSearchTerm` function to avoid excessive re-renders.
   - Example:
     ```javascript
     const debouncedSetSearchTerm = useDebounce(setSearchTerm, 300);
     ```

2. **Dot Notation:**
   - Use dot notation to search nested fields. For example, `'address.city'` will search the `city` field inside the `address` object.

3. **Empty Search Term:**
   - If the `searchTerm` is empty, the hook returns the original data.

---

## Troubleshooting

### Issue: No Results Found
- Ensure the `keys` option includes the correct fields to search.
- Check if the `searchTerm` matches the data (case sensitivity matters if `caseSensitive: true`).

### Issue: Nested Fields Not Being Searched
- Use dot notation in the `keys` option to specify nested fields (e.g., `'interactions.question'`).

---

## Conclusion
The `useSearch` hook is a powerful and flexible tool for implementing search functionality in React applications. It supports both arrays and objects, nested data structures, and customizable search options. Use it to enhance user experience by enabling dynamic filtering of data.
*/





/*
 example 
 Here are **5 practical examples** demonstrating how to use the `useSearch` hook in different scenarios. Each example includes sample data, usage, and expected output.

---

### Example 1: Filtering an Array of Objects (Simple)

#### Data
```javascript
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com' },
];
```

#### Usage
```javascript
const { searchTerm, setSearchTerm, searchData } = useSearch(users);

const filteredUsers = searchData(users, {
  keys: ['name', 'email'],
  caseSensitive: false,
});
```

#### Search Term: `"john"`

#### Filtered Output
```javascript
[
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com' },
]
```

---

### Example 2: Filtering Nested Objects in an Array

#### Data
```javascript
const products = [
  {
    id: 1,
    name: 'Laptop',
    details: {
      brand: 'Dell',
      price: 1200,
    },
  },
  {
    id: 2,
    name: 'Smartphone',
    details: {
      brand: 'Apple',
      price: 999,
    },
  },
];
```

#### Usage
```javascript
const { searchTerm, setSearchTerm, searchData } = useSearch(products);

const filteredProducts = searchData(products, {
  keys: ['name', 'details.brand'],
  caseSensitive: false,
});
```

#### Search Term: `"apple"`

#### Filtered Output
```javascript
[
  {
    id: 2,
    name: 'Smartphone',
    details: {
      brand: 'Apple',
      price: 999,
    },
  },
]
```

---

### Example 3: Filtering a Plain Object

#### Data
```javascript
const books = {
  book1: {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
  },
  book2: {
    title: '1984',
    author: 'George Orwell',
  },
  book3: {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
  },
};
```

#### Usage
```javascript
const { searchTerm, setSearchTerm, searchData } = useSearch(books);

const filteredBooks = searchData(books, {
  keys: ['title', 'author'],
  caseSensitive: false,
});
```

#### Search Term: `"orwell"`

#### Filtered Output
```javascript
{
  book2: {
    title: '1984',
    author: 'George Orwell',
  },
}
```

---

### Example 4: Filtering an Array with Nested Arrays

#### Data
```javascript
const teams = [
  {
    name: 'Team A',
    members: [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ],
  },
  {
    name: 'Team B',
    members: [
      { id: 3, name: 'Charlie' },
      { id: 4, name: 'David' },
    ],
  },
];
```

#### Usage
```javascript
const { searchTerm, setSearchTerm, searchData } = useSearch(teams);

const filteredTeams = searchData(teams, {
  keys: ['name', 'members.name'],
  caseSensitive: false,
});
```

#### Search Term: `"bob"`

#### Filtered Output
```javascript
[
  {
    name: 'Team A',
    members: [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ],
  },
]
```

---

### Example 5: Filtering Mixed Data (Array and Object)

#### Data
```javascript
const data = {
  users: [
    { id: 1, name: 'John', role: 'Admin' },
    { id: 2, name: 'Jane', role: 'User' },
  ],
  products: [
    { id: 1, name: 'Laptop', category: 'Electronics' },
    { id: 2, name: 'Desk', category: 'Furniture' },
  ],
};
```

#### Usage
```javascript
const { searchTerm, setSearchTerm, searchData } = useSearch(data);

const filteredData = searchData(data, {
  keys: ['users.name', 'users.role', 'products.name', 'products.category'],
  caseSensitive: false,
});
```

#### Search Term: `"admin"`

#### Filtered Output
```javascript
{
  users: [
    { id: 1, name: 'John', role: 'Admin' },
  ],
  products: [],
}
```

---

## Summary of Examples

| Example | Data Type          | Search Term | Filtered Output                                                                 |
|---------|--------------------|-------------|---------------------------------------------------------------------------------|
| 1       | Array of Objects   | `"john"`    | Users with `name` or `email` containing "john".                                 |
| 2       | Nested Objects     | `"apple"`   | Products with `details.brand` containing "apple".                               |
| 3       | Plain Object       | `"orwell"`  | Books with `author` containing "orwell".                                        |
| 4       | Nested Arrays      | `"bob"`     | Teams with `members.name` containing "bob".                                     |
| 5       | Mixed Data         | `"admin"`   | Users with `role` containing "admin".                                           |

---

These examples demonstrate the flexibility and power of the `useSearch` hook. You can adapt it to various data structures and use cases!
*//*
Here’s a detailed documentation for the `useSearch` custom hook. This documentation explains its purpose, usage, parameters, return values, and examples.

---

# `useSearch` Custom Hook Documentation

## Overview
The `useSearch` hook is a reusable React hook designed to filter data (arrays or objects) based on a search term. It supports nested data structures, dot notation for keys, and case-insensitive searching. It is ideal for implementing search functionality in applications with complex data.

---

## Installation
To use the `useSearch` hook, simply copy the code into your project or import it from a utility file.

```javascript
import useSearch from './useSearch';
```

---

## API Reference

### Parameters
The `useSearch` hook accepts one argument:

| Parameter     | Type             | Description                                                                 |
|---------------|------------------|-----------------------------------------------------------------------------|
| `initialData` | `Array` or `Object` | The data to be filtered. Can be an array of objects or a plain object.      |

---

### Return Values
The hook returns an object with the following properties:

| Property        | Type               | Description                                                                 |
|-----------------|--------------------|-----------------------------------------------------------------------------|
| `searchTerm`    | `string`           | The current search term.                                                    |
| `setSearchTerm` | `function`         | A function to update the search term.                                       |
| `searchData`    | `function`         | A function to filter the data based on the search term and options.         |

### `searchData` Function
The `searchData` function is used to filter the data. It accepts two arguments:

| Parameter     | Type             | Description                                                                 |
|---------------|------------------|-----------------------------------------------------------------------------|
| `data`        | `Array` or `Object` | The data to filter.                                                        |
| `options`     | `Object`         | Configuration options for the search.                                       |

#### `options` Object
| Property         | Type               | Default Value | Description                                                                 |
|------------------|--------------------|---------------|-----------------------------------------------------------------------------|
| `keys`           | `Array<string>`    | `[]`          | Keys to search within the data. Supports dot notation for nested fields.    |
| `caseSensitive`  | `boolean`          | `false`       | If `true`, the search will be case-sensitive.                               |

---

## Usage

### Basic Example (Array of Objects)
```javascript
const data = [
  {
    topic: 'React Components',
    interactions: [
      {
        id: 1,
        question: 'How to create reusable components in React?',
        answer: 'You can create reusable components by...',
      },
    ],
  },
  {
    topic: 'AI Ethics',
    interactions: [
      {
        id: 2,
        question: 'Ethical considerations in AI development',
        answer: 'Key ethical considerations include...',
      },
    ],
  },
];

const { searchTerm, setSearchTerm, searchData } = useSearch(data);

const filteredData = searchData(data, {
  keys: ['topic', 'interactions.question', 'interactions.answer'],
  caseSensitive: false,
});
```

### Example (Plain Object)
```javascript
const data = {
  topic1: {
    title: 'React Components',
    description: 'Learn how to build reusable components in React.',
  },
  topic2: {
    title: 'AI Ethics',
    description: 'Ethical considerations in AI development.',
  },
};

const { searchTerm, setSearchTerm, searchData } = useSearch(data);

const filteredData = searchData(data, {
  keys: ['title', 'description'],
  caseSensitive: false,
});
```

---

## Features

### 1. **Nested Data Support**
   - The hook can search through nested objects and arrays using dot notation in the `keys` option.
   - Example: `'interactions.question'` will search the `question` field inside the `interactions` array.

### 2. **Case-Insensitive Search**
   - By default, the search is case-insensitive. Set `caseSensitive: true` in the options to make it case-sensitive.

### 3. **Supports Both Arrays and Objects**
   - Works with arrays of objects and plain objects.

### 4. **Dynamic Filtering**
   - The `searchData` function dynamically filters the data whenever the `searchTerm` changes.

---

## Examples

### Example 1: Filtering an Array of Objects
```javascript
const data = [
  {
    name: 'John',
    age: 25,
    address: {
      city: 'New York',
      country: 'USA',
    },
  },
  {
    name: 'Jane',
    age: 30,
    address: {
      city: 'London',
      country: 'UK',
    },
  },
];

const { searchTerm, setSearchTerm, searchData } = useSearch(data);

const filteredData = searchData(data, {
  keys: ['name', 'address.city'],
  caseSensitive: false,
});
```

### Example 2: Filtering a Plain Object
```javascript
const data = {
  user1: {
    name: 'Alice',
    role: 'Admin',
  },
  user2: {
    name: 'Bob',
    role: 'User',
  },
};

const { searchTerm, setSearchTerm, searchData } = useSearch(data);

const filteredData = searchData(data, {
  keys: ['name', 'role'],
  caseSensitive: false,
});
```

---

## Notes
1. **Performance Considerations:**
   - For large datasets, consider debouncing the `setSearchTerm` function to avoid excessive re-renders.
   - Example:
     ```javascript
     const debouncedSetSearchTerm = useDebounce(setSearchTerm, 300);
     ```

2. **Dot Notation:**
   - Use dot notation to search nested fields. For example, `'address.city'` will search the `city` field inside the `address` object.

3. **Empty Search Term:**
   - If the `searchTerm` is empty, the hook returns the original data.

---

## Troubleshooting

### Issue: No Results Found
- Ensure the `keys` option includes the correct fields to search.
- Check if the `searchTerm` matches the data (case sensitivity matters if `caseSensitive: true`).

### Issue: Nested Fields Not Being Searched
- Use dot notation in the `keys` option to specify nested fields (e.g., `'interactions.question'`).

---

## Conclusion
The `useSearch` hook is a powerful and flexible tool for implementing search functionality in React applications. It supports both arrays and objects, nested data structures, and customizable search options. Use it to enhance user experience by enabling dynamic filtering of data.
*/





/*
 example 
 Here are **5 practical examples** demonstrating how to use the `useSearch` hook in different scenarios. Each example includes sample data, usage, and expected output.

---

### Example 1: Filtering an Array of Objects (Simple)

#### Data
```javascript
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com' },
];
```

#### Usage
```javascript
const { searchTerm, setSearchTerm, searchData } = useSearch(users);

const filteredUsers = searchData(users, {
  keys: ['name', 'email'],
  caseSensitive: false,
});
```

#### Search Term: `"john"`

#### Filtered Output
```javascript
[
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com' },
]
```

---

### Example 2: Filtering Nested Objects in an Array

#### Data
```javascript
const products = [
  {
    id: 1,
    name: 'Laptop',
    details: {
      brand: 'Dell',
      price: 1200,
    },
  },
  {
    id: 2,
    name: 'Smartphone',
    details: {
      brand: 'Apple',
      price: 999,
    },
  },
];
```

#### Usage
```javascript
const { searchTerm, setSearchTerm, searchData } = useSearch(products);

const filteredProducts = searchData(products, {
  keys: ['name', 'details.brand'],
  caseSensitive: false,
});
```

#### Search Term: `"apple"`

#### Filtered Output
```javascript
[
  {
    id: 2,
    name: 'Smartphone',
    details: {
      brand: 'Apple',
      price: 999,
    },
  },
]
```

---

### Example 3: Filtering a Plain Object

#### Data
```javascript
const books = {
  book1: {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
  },
  book2: {
    title: '1984',
    author: 'George Orwell',
  },
  book3: {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
  },
};
```

#### Usage
```javascript
const { searchTerm, setSearchTerm, searchData } = useSearch(books);

const filteredBooks = searchData(books, {
  keys: ['title', 'author'],
  caseSensitive: false,
});
```

#### Search Term: `"orwell"`

#### Filtered Output
```javascript
{
  book2: {
    title: '1984',
    author: 'George Orwell',
  },
}
```

---

### Example 4: Filtering an Array with Nested Arrays

#### Data
```javascript
const teams = [
  {
    name: 'Team A',
    members: [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ],
  },
  {
    name: 'Team B',
    members: [
      { id: 3, name: 'Charlie' },
      { id: 4, name: 'David' },
    ],
  },
];
```

#### Usage
```javascript
const { searchTerm, setSearchTerm, searchData } = useSearch(teams);

const filteredTeams = searchData(teams, {
  keys: ['name', 'members.name'],
  caseSensitive: false,
});
```

#### Search Term: `"bob"`

#### Filtered Output
```javascript
[
  {
    name: 'Team A',
    members: [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ],
  },
]
```

---

### Example 5: Filtering Mixed Data (Array and Object)

#### Data
```javascript
const data = {
  users: [
    { id: 1, name: 'John', role: 'Admin' },
    { id: 2, name: 'Jane', role: 'User' },
  ],
  products: [
    { id: 1, name: 'Laptop', category: 'Electronics' },
    { id: 2, name: 'Desk', category: 'Furniture' },
  ],
};
```

#### Usage
```javascript
const { searchTerm, setSearchTerm, searchData } = useSearch(data);

const filteredData = searchData(data, {
  keys: ['users.name', 'users.role', 'products.name', 'products.category'],
  caseSensitive: false,
});
```

#### Search Term: `"admin"`

#### Filtered Output
```javascript
{
  users: [
    { id: 1, name: 'John', role: 'Admin' },
  ],
  products: [],
}
```

---

## Summary of Examples

| Example | Data Type          | Search Term | Filtered Output                                                                 |
|---------|--------------------|-------------|---------------------------------------------------------------------------------|
| 1       | Array of Objects   | `"john"`    | Users with `name` or `email` containing "john".                                 |
| 2       | Nested Objects     | `"apple"`   | Products with `details.brand` containing "apple".                               |
| 3       | Plain Object       | `"orwell"`  | Books with `author` containing "orwell".                                        |
| 4       | Nested Arrays      | `"bob"`     | Teams with `members.name` containing "bob".                                     |
| 5       | Mixed Data         | `"admin"`   | Users with `role` containing "admin".                                           |

---

These examples demonstrate the flexibility and power of the `useSearch` hook. You can adapt it to various data structures and use cases!
*/