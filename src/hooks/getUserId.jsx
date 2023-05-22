import jwt from 'jsonwebtoken';

const token = 'AUTH-TOKEN';

try {
    const decoded = jwt.verify(token, 'your secret key');
    const userId = decoded.userId;
    console.log('User ID:', userId);
} catch (err) {
    console.error(err);
}