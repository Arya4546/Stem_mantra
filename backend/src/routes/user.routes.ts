import { Router } from 'express';
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  toggleUserStatus,
  changeUserRole,
  getUserStats,
} from '../controllers/user.controller';
import { authenticate, authorize } from '../middlewares/auth';

const router = Router();

// All user routes require authentication and admin role
router.use(authenticate);
router.use(authorize('ADMIN', 'SUPER_ADMIN'));

// Get user statistics
router.get('/stats', getUserStats);

// Get all users with pagination and filters
router.get('/', getUsers);

// Create a new user (admin only)
router.post('/', createUser);

// Get single user by ID
router.get('/:id', getUserById);

// Update user
router.patch('/:id', updateUser);

// Delete user
router.delete('/:id', deleteUser);

// Toggle user active status
router.patch('/:id/toggle-status', toggleUserStatus);

// Change user role
router.patch('/:id/role', changeUserRole);

export default router;
