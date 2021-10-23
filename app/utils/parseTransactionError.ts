const errorMessages = {
  BAG_FULL:
    "My bag is too heavy. Don't you think we have enough treats? Let's go eat some and share with our friends. Happy Halloween!",
  TOO_TIRED:
    "Oww, my feet hurt. I think that's enough trick-or-treating for today. Let's go again tomorrow?",
  ALREADY_VISITED_TODAY:
    "I think we've been here already today. Let's try another place?",
  NO_ANSWER:
    "Aww, no one answered the door and the lights are out. Maybe no one is home. Let's try another place?",
};

export const parseTransactionError = (error: Error) => {
  for (const [errorCode, message] of Object.entries(errorMessages)) {
    if (error.message.includes(`PUMPKIN__${errorCode}`)) {
      return {
        error: errorCode,
        message,
      };
    }
  }
};
