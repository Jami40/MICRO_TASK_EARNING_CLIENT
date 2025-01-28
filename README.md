# TOLOKO - Micro Task Earning Platform

## Live Demo
🌐 [Live Site](https://poor-owl.surge.sh/)
🖥️ [Server](https://vercel.com/jami23s-projects/micro-task-earning-server)


## Repository Links

- [Client Repository](https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-Jami40)
- [Server Repository](https://github.com/Programming-Hero-Web-Course4/b10a12-server-side-Jami40)

## Project Overview
TOLOKO is a micro-task earning platform where users can earn money by completing small tasks. The platform connects task posters (buyers) with workers, facilitating a seamless micro-task marketplace.

## Key Features

### User Features
- Multi-role authentication (Admin/Buyer/Worker)
- Profile management with role-based access
- Virtual coin system for transactions
- Payment processing with Stripe
- Task submission and approval system

### Admin Dashboard
- Comprehensive user management
- Task monitoring and control
- Payment transaction oversight
- Withdrawal request management
- Statistical data visualization

### Task Management
- Task creation with image upload
- Detailed task descriptions
- Task status tracking
- Submission review system

### Payment System
- Secure Stripe integration
- Virtual coin purchases
- Payment history tracking
- Withdrawal functionality

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- DaisyUI
- React Icons
- SweetAlert2
- React Toastify
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB
- Stripe Integration

## Deployment

- Frontend: Deployed on [Surge](https://poor-owl.surge.sh/)
- Backend: Deployed on [Vercel](https://vercel.com/jami23s-projects/micro-task-earning-server)

## API Endpoints

### Authentication
- `POST /users` - User registration
- `POST /login` - User login

### Tasks
- `GET /tasks` - Get all tasks
- `POST /tasks` - Create new task
- `DELETE /tasks/:id` - Delete task
- `PATCH /tasks/:id` - Update task status

### Payments
- `POST /payments/save-payment` - Process payment
- `GET /payments/history/:email` - Get payment history

### Admin
- `GET /admin/users` - Get all users
- `PATCH /admin/users/role/:id` - Update user role
- `DELETE /admin/users/:id` - Delete user

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License.

## Contact
For any queries or support, please reach out:
- GitHub: [@Jami40](https://github.com/Jami40)
