import { renderHook, act } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from '../../context/AuthContext';
import useAuthHook from '../../hooks/useAuth';

describe('useAuth hook', () => {
  it('should initialize with default state', () => {
    const { result } = renderHook(() => useAuthHook(), { wrapper: AuthProvider });
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
  });

  it('should handle login', async () => {
    const { result } = renderHook(() => useAuthHook(), { wrapper: AuthProvider });
    await act(async () => {
      await result.current.handleLogin('test@example.com', 'password');
    });
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should handle logout', async () => {
    const { result } = renderHook(() => useAuthHook(), { wrapper: AuthProvider });
    await act(async () => {
      await result.current.handleLogin('test@example.com', 'password');
      await result.current.handleLogout();
    });
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should handle login error', async () => {
    const { result } = renderHook(() => useAuthHook(), { wrapper: AuthProvider });
    await act(async () => {
      await result.current.handleLogin('wrong@example.com', 'wrongpassword');
    });
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).not.toBe(null);
  });
});
