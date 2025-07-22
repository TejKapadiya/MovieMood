const request = require("supertest");
const app = require("../server");
const User = require("../models/User");

describe("Authentication Tests", () => {
    it("Should register a new user", async () => {
        const res = await request(app).post("/api/auth/register").send({
            name: "Test User",
            email: "test@example.com",
            password: "password123",
            preferences: ["Action", "Comedy"]
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.token).toBeDefined();
    });

    it("Should login a user", async () => {
        await request(app).post("/api/auth/register").send({
            name: "Test User",
            email: "test@example.com",
            password: "password123",
            preferences: ["Action"]
        });

        const res = await request(app).post("/api/auth/login").send({
            email: "test@example.com",
            password: "password123"
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBeDefined();
    });

    afterAll(async () => {
        await User.deleteMany();
    });
});
