import axios from "axios";

export const add_user = ({ user_data }) => (dispatch) => {
  axios
    .post("http://localhost:3000/api/register", user_data)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.data);
    });
};
