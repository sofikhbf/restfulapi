/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const request = require("supertest")
const router = require("../app/routes/routes.js")
const db = require("../app/config/db.config.js");

const app = express()
app.use("/", router)

describe("test handlers", function () {
    test("respond to /", async()=>{
        const response = await request(app).get("/")
        expect(response.text).to.equal("API READY TO GO!")
    })
    test("respond to /tutorials", async()=>{
        const response = await request(app).get("/tutorials")
        const sql = `SELECT * FROM tutorials`

        db.query(sql, (err, data) =>{
            expect(err).toBeNull()
            expect(response.body).toEqual({
                status: true,
                message: "GET success",
                data: data,
            })
        })
    })
    test("post to /tutorials",async()=>{
        const reqBody = {
            id: 4,
            title: "Just For Fun",
            description: "-",
            published: 2020,
        }
        const response = await request(app)
        .post("/tutorials")
        .send(reqBody)
        .set("Accept", "application/json")

        try{
            const{id, title, description, published} = req.body
            const sql = `INSERT INTO tutorials (id, title, description, published) VALUES (${id}, ${title}, ${description}, ${published})`

            db.query(sql, (err,data)=>{
                expect(err).toBeNull()
                expect(response.body).toEqual({
                status: true,
                message: "GET success",
                data: {
                    id: data.id,
                    fields: req.body,
                },
            })
        })
    }catch (err) {
        console.log(err)
    }
})
afterAll((done)=>{
    db.end(done)
})
})