const request = require('supertest');
const admin = require('firebase-admin');
const {app} = require('../index.js'); // Import your Express app


// Clean up Firebase emulator
    afterAll(async () => {
        await admin.app().delete();
    });

    describe('GET /getAllProducts', () => {
        test('should return all products', async () => {
            const response = await request(app)
                .get('/api/products/all');

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            // Add more assertions for the response body as needed
        });
    });
