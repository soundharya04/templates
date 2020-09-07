const initState = {};

const Reducer = (state = initState, actions) => {
  switch (actions.type) {
    case "ADD_USER":
      return {
        ...state,
      };

    default:
      return null;
  }
};

export default Reducer;
