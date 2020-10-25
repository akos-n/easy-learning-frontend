function getServerURL() {
  console.log(process.env);

  return process.env.EASY_LEARNING_URL !== undefined
    ? process.env.EASY_LEARNING_URL
    : "http://localhost:3500/";
}

export { getServerURL as default };
