import { RouterProvider } from 'react-router';
import { router } from './routes';

export default function App() {
  return (
    <div style={{ fontFamily: 'Poppins, sans-serif', background: '#FDECEC', minHeight: '100vh' }}>
      <RouterProvider router={router} />
    </div>
  );
}