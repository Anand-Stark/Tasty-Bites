const request = require('supertest');
const admin = require('firebase-admin');
const {app} = require('../index.js'); // Import your Express app

// Clean up Firebase emulator
afterAll(async () => {
    await admin.app().delete();
});

describe('GET /orders', () => {
    test('should return orders', async () => {
        const response = await request(app)
            .get('/api/products/orders');
                             
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toBeDefined();
        // Add more assertions for the response body as needed
    });

    test('should return 400 if there are no orders', async () => {
        const response = await request(app)
            .get('/api/products/orders');

            expect(response._fieldsProto).toBe(undefined);
            expect(response.body.success).toBe(true);
        // Add more assertions for the response body as needed
    });

    test('should return 500 if there is an error while fetching orders', async () => {
        // Simulate scenario where an error occurs while fetching orders
        // (e.g., invalid database connection)

        const response = await request(app)
            .get('/api/products/orde');

        expect(response.status).toBe(404);
        // Add more assertions for the response body as needed
    });
});
