const express = require('express');
const supertest = require("supertest");
const app = require("../server");
const request = supertest(app);


const contacts = require('../routes/contacts')
const corrective = require('../routes/corrective')
app.use('/', contacts);

describe("Test handlers", () => {
     test("responds to get /contacts", async () => {
        const res = await request.get("/")
        console.log(res.statusCode)
        expect(res.statusCode).toBe(200)
        expect(res.header["content-type"]).toBe("text/html; charset=utf-8")
    });    
});


app.use('/', corrective);

describe("Test handlers", () => {
     test("responds to get /corrective", async () => {
        const res = await request.get("/")
        console.log(res.statusCode)
        expect(res.statusCode).toBe(200)
        expect(res.header["content-type"]).toBe("text/html; charset=utf-8")
    })
})