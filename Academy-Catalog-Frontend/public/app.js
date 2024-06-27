const client = feathers();
client.configure(
  feathers.authentication({
    storage: window.localStorage,
  })
);

const login = async () => {
  try {
    return await client.reAuthenticate();
  } catch (error) {
    return await client.reAuthenticate({
      strategy: "local",
      email: "email1",
      password: "abc",
    });
  }
};

const main = async () => {
  const auth = await login();
};

main();
