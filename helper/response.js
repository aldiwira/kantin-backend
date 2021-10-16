module.exports = {
  set: (status, code, message, data) => {
    return {
      status,
      code,
      message,
      data: data ? data : null,
    };
  },
};
