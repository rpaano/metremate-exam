export default defineEventHandler((event) => {
  const authHeader = getHeader(event, 'authorization');

  if (authHeader !== 'Bearer dummy-jwt-token') {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }

  return {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
  };
});
