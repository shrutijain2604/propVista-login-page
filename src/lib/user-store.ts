// In-memory user store for demo sign-up — resets on server restart and won't
// work across serverless instances. Swap for a real database before deploying.

type StoredUser = {
  id: string;
  email: string;
  passwordHash: string;
};

const users = new Map<string, StoredUser>();

export function getUser(email: string) {
  return users.get(email.toLowerCase());
}

export function createUser(email: string, passwordHash: string): StoredUser {
  const user: StoredUser = {
    id: crypto.randomUUID(),
    email: email.toLowerCase(),
    passwordHash,
  };
  users.set(user.email, user);
  return user;
}
