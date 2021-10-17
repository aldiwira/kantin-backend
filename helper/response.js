module.exports = {
  set: (status, message, data) => {
    return {
      status,
      message,
      datas: data ? data : null,
    };
  },
};
