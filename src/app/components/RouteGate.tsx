import { Navigate } from 'react-router';
import { getCurrentSession, type UserRole } from '../lib/platform';

type RouteGateProps = {
  allow: UserRole;
  children: React.ReactNode;
};

export default function RouteGate({ allow, children }: RouteGateProps) {
  const session = getCurrentSession();

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (session.role !== allow) {
    return <Navigate to={session.role === 'admin' ? '/admin' : '/dashboard'} replace />;
  }

  return <>{children}</>;
}
