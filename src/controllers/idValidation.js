const isIdValid = (id) => {
  if (!id) {
    return { validID: false, status: 400, message: "ID is required" };
  }

  if (isNaN(parseInt(id))) {
    return {
      validID: false,
      status: 400,
      message: "ID must be a number",
    };
  }

  if (id < 0) {
    return {
      validID: false,
      status: 422,
      message: "ID must be a positive number",
    };
  }

  return { validID: true };
};

export default isIdValid;
