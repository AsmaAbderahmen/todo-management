import supertest from "supertest";
import app, {db} from "../src/app";

const request = supertest(app);

// timeout 10 seconds
jest.setTimeout(100000);
afterAll(async (done) => {
    await db.connection.close();
    done();
});

test("signup returns user data ", async (done) => {
    request
        .post('/graphql')
        .send({
            query: `mutation {
        signup(userInput: {email: "test@test.com", password: "123", username:"test"}) {
          _id
          email
          username
        }
      }`,
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function (err, res) {
            if (err) return done(err);
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.data.login.token).toBeDefined()
            done();
        });
});

test("login returns a token", async (done) => {
    request
        .post('/graphql')
        .send({
            query: `mutation {
        login(authInput: {email: "asma.abderahmen@gmail.com", password: "123456"}) {
          token
        }
      }`,
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function (err, res) {
            if (err) return done(err);
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.data.login.token).toBeDefined()
            done();
        });
});

test("creatTodo", async (done) => {
    request
        .post('/graphql')
        .send({
            query: `mutation {
        createTodo(title: "todo test title", description: "todo test desc") {
          _id
          title
          description
          done
          owner:{_id username}
          guests:{_id username}
          comments:{_id text user{username}}
        }
      }`,
        })
        .set("Accept", "application/json")
        .set('Authorization', 'abc123')
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function (err, res) {
            if (err) return done(err);
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.data.login.token).toBeDefined()
            done();
        });
});

test("updateTodo", async (done) => {
    request
        .post('/graphql')
        .send({
            query: `mutation {
        updateTodo(id:"608df79139029b5f5b3303fe",title: "todo test title updated", description: "todo test desc updateed",done: true) {
          _id
          title
          description
          done
          owner:{_id username}
          guests:{_id username}
          comments:{_id text user{username}}
        }
      }`,
        })
        .set("Accept", "application/json")
        .set('Authorization', 'abc123')
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function (err, res) {
            if (err) return done(err);
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.data.login.token).toBeDefined()
            done();
        });
});

test("shareTodo", async (done) => {
    request
        .post('/graphql')
        .send({
            query: `mutation {
        shareTodo(id: "608df79139029b5f5b3303fe", new_guests:["60907bdff1bb4d53caaad6a9"])  {
          _id
          title
          description
          done
          owner:{_id username}
          guests:{_id username}
          comments:{_id text user{username}}
        }
      }`,
        })
        .set("Accept", "application/json")
        .set('Authorization', 'abc123')
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function (err, res) {
            if (err) return done(err);
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.data.login.token).toBeDefined()
            done();
        });
});

test("deleteTodo", async (done) => {
    request
        .post('/graphql')
        .send({
            query: `mutation {
        deletTodo(id: "608df800daa5cc5fa691a718") {
        }
      }`,
        })
        .set("Accept", "application/json")
        .set('Authorization', 'abc123')
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function (err, res) {
            if (err) return done(err);
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.data.login.token).toBeDefined()
            done();
        });
});

test("commentTodo", async (done) => {
    request
        .post('/graphql')
        .send({
            query: `mutation {
        commentTodo(id: "608df79139029b5f5b3303fe", text: "comment test")  {
          _id
          title
          description
          done
          owner:{_id username}
          guests:{_id username}
          comments:{_id text user{username createdAt}}        }
      }`,
        })
        .set("Accept", "application/json")
        .set('Authorization', 'abc123')
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function (err, res) {
            if (err) return done(err);
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.data.login.token).toBeDefined()
            done();
        });
});


test("users", async (done) => {
    request
        .post('/graphql')
        .send({
            query: `query {
        users {
          _id
       email
       username
        }
      }`,
        })
        .set("Accept", "application/json")
        .set('Authorization', 'abc123')
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function (err, res) {
            if (err) return done(err);
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.data.login.token).toBeDefined()
            done();
        });
});

test("user", async (done) => {
    request
        .post('/graphql')
        .send({
            query: `query {
        user(id:"608aa6c8e55eb81ca85ccf2d")  {
          _id
          email
          username }
      }`,
        })
        .set("Accept", "application/json")
        .set('Authorization', 'abc123')
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function (err, res) {
            if (err) return done(err);
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.data.login.token).toBeDefined()
            done();
        });
});

test("userProfile", async (done) => {
    request
        .post('/graphql')
        .send({
            query: `query {
        user  {
         _id
         email
         username
         todos:{
                title
                description
                done}
        }
      }`,
        })
        .set("Accept", "application/json")
        .set('Authorization', 'abc123')
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function (err, res) {
            if (err) return done(err);
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.data.login.token).toBeDefined()
            done();
        });
});

test("todos", async (done) => {
    request
        .post('/graphql')
        .send({
            query: `query {
        todos  {
          _id
          title
          description
          done
          owner:{_id username}
          guests:{_id username}
          comments:{_id text user{username createdAt}}
        }
      }`,
        })
        .set("Accept", "application/json")
        .set('Authorization', 'abc123')
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function (err, res) {
            if (err) return done(err);
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.data.login.token).toBeDefined()
            done();
        });
});

test("todo", async (done) => {
    request
        .post('/graphql')
        .send({
            query: `query {
        todo(id:"608df79139029b5f5b3303fe")  {
          _id
          title
          description
          done
          owner:{_id username}
          guests:{_id username}
          comments:{_id text user{username createdAt}}
        }
      }`,
        })
        .set("Accept", "application/json")
        .set('Authorization', 'abc123')
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function (err, res) {
            if (err) return done(err);
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.data.login.token).toBeDefined()
            done();
        });
});