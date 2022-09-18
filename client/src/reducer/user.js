const initalState = {
  login: false,
  id: "",
  name: "",
};

const User = (state = initalState, action) => {
  console.log(action);
  console.log(action.id);
  console.log(action.name);
  switch (action.type) {
    case "login":
      return {
        ...state,
        login: true,
        id: action.id,
        name: action.name,
      };
    case "logout":
      return {
        ...state,
        login: false,
        id: "",
        name: "",
      };

    // default를 쓰지 않으면 맨처음 state에 count값이 undefined가 나옵니다 꼭! default문을 넣으세요
    default:
      return state;
  }
};

export default User;
