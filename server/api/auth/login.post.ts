export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Dummy authentication logic
  if (body.email === 'test@example.com' && body.password === 'Qwer1234') {
    
    return {
      token: 'dummy-jwt-token',
      user: { id: 1, name: 'Test User', email: 'test@example.com' },
    };
  }

  throw createError({
    statusCode: 401,
    statusMessage: 'Invalid credentials',
  });
});
