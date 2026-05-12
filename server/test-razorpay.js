import "dotenv/config";
import Razorpay from "razorpay";

const key_id = process.env.RAZORPAY_KEY;
const key_secret = process.env.RAZORPAY_KEY_SECRET;

console.log('Key ID:', key_id);
console.log('Key Secret length:', key_secret ? key_secret.length : 0);

try {
  const razorpay = new Razorpay({ key_id, key_secret });
  console.log('Razorpay instance created successfully');

  // Try to create a test order
  const order = await razorpay.orders.create({
    amount: 100, // 1 rupee in paise
    currency: 'INR',
    receipt: 'test_receipt'
  });

  console.log('Test order created:', order.id);
} catch (error) {
  console.error('Error:', error.message);
}