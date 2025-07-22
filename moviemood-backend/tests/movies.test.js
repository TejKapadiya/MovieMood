const request = require("supertest");
const app = require("../server");
const Movie = require("../models/Movie");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

let userToken;
let adminToken;

beforeAll(async () => {
    const user = await User.create({ name: "User", email: "user@example.com", password: "password123", role: "user" });
    const admin = await User.create({ name: "Admin", email: "admin@example.com", password: "password123", role: "admin" });

    userToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    adminToken = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
});

describe("Movie API Tests", () => {
    let movieId;

    it("Should create a movie (Admin Only)", async () => {
        const res = await request(app)
            .post("/api/movies")
            .set("Authorization", `Bearer ${adminToken}`)
            .send({
                title: "Test Movie",
                description: "A great movie",
                genre: ["Action"],
                releaseYear: 2022,
                poster: "https://example.com/poster.jpg",
                cast: [{ name: "Actor", photo: "https://example.com/actor.jpg" }]
            });
        expect(res.statusCode).toBe(201);
        movieId = res.body._id;
    });

    it("Should fetch all movies", async () => {
        const res = await request(app).get("/api/movies");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it("Should fetch a single movie by ID", async () => {
        const res = await request(app).get(`/api/movies/${movieId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe("Test Movie");
    });

    it("Should delete a movie (Admin Only)", async () => {
        const res = await request(app)
            .delete(`/api/movies/${movieId}`)
            .set("Authorization", `Bearer ${adminToken}`);
        expect(res.statusCode).toBe(200);
    });

    afterAll(async () => {
        await Movie.deleteMany();
        await User.deleteMany();
    });
});
