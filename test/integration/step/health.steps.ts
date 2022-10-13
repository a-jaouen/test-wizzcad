import http from 'http'
import { After, Before, Fusion, Then, When } from 'jest-cucumber-fusion'
import supertest from 'supertest'
import app from '../../../src/app'

let server: http.Server
let res: any

Before(async () => {
    server = http.createServer(await app())
})

After(async () => {
    server.close()
})

When("I check server's health", async () => {
    res = await supertest(server).get('/health')
})

Then('I get a 200 response and a json with ok flag set to true', async () => {
    expect(res.status).toBe(200)
    expect(res.ok).toBe(true)
})

Fusion('../feature/health.feature')
