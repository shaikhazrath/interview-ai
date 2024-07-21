import userModel from '@/model/userModel';
import jwt from 'jsonwebtoken';
export const verifyToken = async (headers) => {
  const token = headers.get('authorization');

  if (!token) {
    return { status: 401, message: 'No token provided' };
  }

  try {
    const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SEC);
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return { status: 404, message: 'User not found' };
    }

    return { status: 200, user };
  } catch (err) {
    return { status: 403, message: 'Failed to authenticate token' };
  }
};
