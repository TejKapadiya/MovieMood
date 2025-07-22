const request = require("supertest");
const app = require("../server");
const User = require("../models/User");
const Movie = require("../models/Movie");
const jwt = require("jsonwebtoken");

let userToken;

beforeAll(async () => {
    const user = await User.create({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
        preferences: ["Action"],
        role: "user"
    });

    userToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    await Movie.create([
        {
            title: "Action Movie",
            description: "Exciting action movie",
            genre: ["Action"],
            releaseYear: 2022,
            avgRating: 4.5,
            poster: "https://example.com/poster.jpg" // Add poster
        },
        {
            title: "Drama Movie",
            description: "Sad drama movie",
            genre: ["Drama"],
            releaseYear: 2021,
            avgRating: 4.0,
            poster: "https://example.com/poster.jpg" // Add poster
        }
    ]);
    
});

describe("Recommendations API Tests", () => {
    it("Should return personalized movie recommendations", async () => {
        const res = await request(app)
            .get("/api/recommendations")
            .set("Authorization", `Bearer ${userToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it("Should return top movies for guests", async () => {
        const res = await request(app).get("/api/recommendations/guest");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    afterAll(async () => {
        await Movie.deleteMany();
        await User.deleteMany();
    });
});
