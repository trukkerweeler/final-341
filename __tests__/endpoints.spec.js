const express = require('express');
const supertest = require("supertest");
const app = require("../server");
const request = supertest(app);

const contacts = require('../routes/contacts')
const corrective = require('../routes/corrective')
const employees = require('../routes/employees')
const nonconformance = require('../routes/nonconformance')

// test contacts
app.use('/', contacts);
describe("Test handlers", () => {
     test("responds to get /contacts", async () => {
        const res = await request.get("/")
        console.log(res.statusCode)
        expect(res.statusCode).toBe(200)
        expect(res.header["content-type"]).toBe("text/html; charset=utf-8")
    });    
});

// test corrective
app.use('/', corrective);

describe("Test handlers", () => {
     test("responds to get /corrective", async () => {
        const res = await request.get("/")
        console.log(res.statusCode)
        expect(res.statusCode).toBe(200)
        expect(res.header["content-type"]).toBe("text/html; charset=utf-8")
    })
})


// test employees
app.use('/', employees);

describe("Test handlers", () => {
     test("responds to get /employees", async () => {
        const res = await request.get("/")
        console.log(res.statusCode)
        expect(res.statusCode).toBe(200)
        expect(res.header["content-type"]).toBe("text/html; charset=utf-8")
    })
})

// test nonconformance
app.use('/', nonconformance);

describe("Test handlers", () => {
     test("responds to get /nonconformance", async () => {
        const res = await request.get("/")
        console.log(res.statusCode)
        expect(res.statusCode).toBe(200)
        expect(res.header["content-type"]).toBe("text/html; charset=utf-8")
    })
})