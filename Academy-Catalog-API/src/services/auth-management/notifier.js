module.exports = (app) => {
  function getLink(type, hash) {
    return "http://localhost:3030/" + type + "?token=" + hash;
  }

  async function sendEmail(email) {
    try {
      const result = await app.service("emails").create(email);
      return result;
    } catch (err) {
      console.error(err);
    }
  }

  return (type, user, notifierOptions = {}) => {
    if (type === "resendVerifySignup") {
      return sendEmail({
        from: "test@localhost",
        to: user.emailAddress,
        subject: "Please confirm your e-mail address",
        text: "Click here: " + getLink("verify", user.verifyToken),
        token: user.verifyToken,
      });
    } else if (type === "verifySignup") {
      return sendEmail({
        from: "test@localhost",
        to: user.emailAddress,
        subject: "E-Mail address verified",
        text: "Registration process complete. Thanks for joining us!",
        type: "confirmation",
      });
    }
  };
};
