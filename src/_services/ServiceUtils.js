function getServerURL() {
  console.log(process.env);

  return process.env.REACT_APP_EASY_LEARNING_URL !== undefined
    ? process.env.REACT_APP_EASY_LEARNING_URL
    : "http://localhost:3500/";
}

export { getServerURL as default };
