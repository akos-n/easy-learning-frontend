function copy(item) {
  return JSON.parse(JSON.stringify(item));
}

const Utilities = {
  copy: copy,
};

export { Utilities as default };
