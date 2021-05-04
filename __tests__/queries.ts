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
