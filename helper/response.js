module.exports = {
  set: (status, message, data) => {
    return {
      status,
      message,
      data: data ? data : null,
    };
  },
};
