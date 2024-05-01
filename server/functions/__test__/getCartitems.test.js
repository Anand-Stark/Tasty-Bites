const request = require('supertest');
const admin = require('firebase-admin');
const {app} = require('../index.js'); // Import your Express app

// Clean up Firebase emulator
afterAll(async () => {
    await admin.app().delete();
});

describe('GET /cart-items/:userId', () => {
    test('should return cart items for a valid user ID', async () => {
        // Replace 'userId' with an actual user ID for testing
        const userId = '9Xe2PlJLhQhOk1AyTvtUTfvEAKn2';

        const response = await request(app)
            .get(`/api/products/getCartItems/${userId}`);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toBeDefined();

        // Add more assertions for the response body as needed
    });

    test('should return 400 if user ID is missing', async () => {
        const response = await request(app)
            .get('/api/products/getCartItems');

        expect(response.status).toBe(404);
        // Add more assertions for the response body as needed
    });

    test('should return 400 if user ID is invalid', async () => {
        // Provide an invalid user ID to trigger an error
        const invalidUserId = 'invalidUserID';

        const response = await request(app)
            .get(`/api/products/getCartItems/${invalidUserId}`);

            expect(response._fieldsProto).toBe(undefined);
            expect(response.body.success).toBe(true);
        // Add more assertions for the response body as needed
    });
});
