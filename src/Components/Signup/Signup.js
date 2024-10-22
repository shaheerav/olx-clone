import React, { useReducer } from "react";
import Logo from "../../olx-logo.png";
import "./Signup.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import { useNavigate, Link } from "react-router-dom";
import reducer from "../../Reducer/Reducer";
import { ACTIONS } from "../../Reducer/action";

const initialState = {
  username: "",
  email: "",
  phone: "",
  password: "",
  loading: false,
  error: null,
  formErrors: {},
};
export default function Signup() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const navigate = useNavigate();
  const validateForm = () => {
    const errors = {};
    if (!state.username || state.username.length < 3) {
      errors.username = "Username must be at least 3 characters long";
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!state.email || !emailPattern.test(state.email)) {
      errors.email = "Invalid email format";
    }
    const phonePattern = /^\d{10}$/;
    if (!state.phone || !phonePattern.test(state.phone)) {
      errors.phone = "Phone number must be 10 digits";
    }
    if (!state.password || state.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
    dispatch({ type: ACTIONS.SET_FORM_ERRORS, payload: errors });
    return Object.keys(errors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    const { username, email, phone, password } = state;

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(result.user, { displayName: username });
      await addDoc(collection(db, "users"), {
        uid: result.user.uid,
        username,
        email,
        phone,
      });
      navigate("/login");
    } catch (errors) {
      console.log(errors);
      dispatch({ type: ACTIONS.SET_LOADING, payload: false }); // Set loading to false
      dispatch({ type: ACTIONS.SET_ERROR, payload: errors.message });
    }
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="logo"></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={state.username}
            onChange={(e) =>
              dispatch({
                type: ACTIONS.SET_FIELD,
                payload: { field: "username", value: e.target.value },
              })
            }
            id="username"
          />
          <br />
          {state.formErrors.username && (
            <p className="error-message">{state.formErrors.username}</p>
          )}
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={state.email}
            onChange={(e) =>
              dispatch({
                type: ACTIONS.SET_FIELD,
                payload: { field: "email", value: e.target.value },
              })
            }
            id="email"
          />
          <br />
          {state.formErrors.email && (
            <p className="error-message">{state.formErrors.email}</p>
          )}
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="tel"
            value={state.phone}
            onChange={(e) =>
              dispatch({
                type: ACTIONS.SET_FIELD,
                payload: { field: "phone", value: e.target.value },
              })
            }
            id="phone"
          />
          <br />
          {state.formErrors.phone && (
            <p className="error-message">{state.formErrors.phone}</p>
          )}
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={state.password}
            onChange={(e) =>
              dispatch({
                type: ACTIONS.SET_FIELD,
                payload: { field: "password", value: e.target.value },
              })
            }
            id="password"
          />
          <br />
          {state.formErrors.password && (
            <p className="error-message">{state.formErrors.password}</p>
          )}
          <br />
          <button disabled={state.loading}>
            {state.loading ? "Loading..." : "Signup"}
          </button>
        </form>
        {state.error && <p className="error-message">{state.error}</p>}

        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
