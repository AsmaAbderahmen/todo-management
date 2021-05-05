"# todo-management" 

The work offers a service to manage users and a list of todos

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
docker run -it -e MONGO_USER=asma -e MONGO_PASSWORD=Up8lx8LzIFFHN2CX -e MONGO_DB=todo_db -p 4000:4000 todo-management
```


