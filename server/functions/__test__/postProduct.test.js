
const request = require('supertest');
const admin = require('firebase-admin');
const {app} = require('../index.js'); // Import your Express app

// Define mock product data
let mockProductData;

// Clean up Firebase emulator
afterAll(async () => {
    await admin.app().delete();
});

describe('POST /createProduct', () => {
    afterEach(async () => {
        // Clean up mock product from Firestore
        await admin.firestore().collection('products').doc(`/${mockProductData.productId}/`).delete();
    });

    test('should create a product', async () => {
        // Set up mock product data for the request body
        mockProductData = {
            prod_name: 'Test Product',
            prod_price: '10',
            prod_category: 'Test Category',
            prod_image: 'https://example.com/image.jpg'
        };

        // Make a POST request to create a product
        const response = await request(app)
            .post('/api/products/create')
            .send(mockProductData);

        // Check the response
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toBeDefined();

        // Set the productId dynamically from the response
        mockProductData.productId = response.body.data.productId;

        // Check if the product was added to Firestore
        const productDoc = await admin.firestore().collection('products').doc(`/${mockProductData.productId}/`).get();
        expect(productDoc.exists).toBe(true);
        expect(productDoc.data()).toEqual(expect.objectContaining(mockProductData));
    });
});
