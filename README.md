"# todo-management" 

The work offers a service to manage users and a list of todos with a list of restrictions: 
  1- a user should be authenticated to be able to manage todos 
  2- a user can see the list and details of his own todos and others shared with him
  3- a user can delete only his own todos
 

# Usage
Choose the master branch in this repository to get the code.

Install all dependencies
```sh
npm install
```

Run the test
```sh
npm test
```


Run the server on the dev mode
```sh
npm run start
```

Run the server on the prod mode
```sh
npm run build
```
```sh
npm run serve
```

Build an image called todo-management
```sh
docker build . -t todo-management
```
run the already build image
```sh
npm run docker
```


