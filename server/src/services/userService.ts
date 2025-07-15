import User from '../Database/models/user';

/**
 * Checks if a user exists by email.
 * @param email - The email to search for.
 * @returns A boolean indicating if the user exists.
 */

export async function findUserByEmail(email: string) {
  return User.findOne({ where: { email } });
}

export async function userExists(email: string): Promise<boolean> {
  const user = await findUserByEmail(email);
  return !!user;
}