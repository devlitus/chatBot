const users = [];
async function getUserByEmail(email) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = users.find((u) => u.email === email);
      resolve(user);
    }, 100);
  });
}
async function createUser(email, passwordHash) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newUser = {
        id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`,
        // ID único simple
        email,
        passwordHash
      };
      users.push(newUser);
      resolve(newUser);
    }, 100);
  });
}
async function hashPassword(password) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`hashed_${password}`);
    }, 50);
  });
}
async function verifyPassword(password, hash) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`hashed_${password}` === hash);
    }, 50);
  });
}

export { createUser as c, getUserByEmail as g, hashPassword as h, verifyPassword as v };
