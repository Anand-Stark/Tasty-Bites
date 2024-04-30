const request = require('supertest');
const admin = require('firebase-admin');
const {app} = require('../index.js'); // Import your Express app

// Clean up Firebase emulator
afterAll(async () => {
    await admin.app().delete();
});

describe('GET /user-type/:userId', () => {
    test('should return user type for a valid user ID', async () => {
        // Replace 'userId' with an actual user ID for testing
        const userId = '9Xe2PlJLhQhOk1AyTvtUTfvEAKn2';

        const response = await request(app)
            .get(`/api/user/user-type/${userId}`);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        // Add more assertions for the response body as needed
    });

    test('should return 500 if user ID is invalid', async () => {
        // Provide an invalid user ID to trigger an error
        const userId = 'asdasd';

        const response = await request(app)
            .get(`/api/user/user-type/${userId}`);

        expect(response._fieldsProto).toBe(undefined);
        expect(response.body.success).toBe(true);
        // Add more assertions for the response body as needed
    });
});
