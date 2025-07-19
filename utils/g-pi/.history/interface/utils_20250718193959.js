const baseMessage = {
  error: false,
  message: "",
  details: null
};

const messages = {
  err(msg, details = null) {
    return {
      ...baseMessage,
      error: true,
      message: msg,
      details
    };
  },

  ok(msg = "Operation completed successfully", details = null) {
    return {
      ...baseMessage,
      message: msg,
      details
    };
  },

  notFound(resource = "Resource") {
    return {
      ...baseMessage,
      error: true,
      message: `${resource} not found.`,
      details: null
    };
  },

  invalidInput(field = "input") {
    return {
      ...baseMessage,
      error: true,
      message: `Invalid ${field}.`,
      details: null
    };
  }
};
