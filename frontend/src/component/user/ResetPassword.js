import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../redux/actions/userAction";
import { useAlert } from "react-alert";
import { Button, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
const match = useParams();
const history = useNavigate();
  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(match.token, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Password Updated Successfully");

      history("/");
    }
  }, [dispatch, error, alert, history, success]);

  return (
    <Fragment>
    
        <Fragment>
              <form
                onSubmit={resetPasswordSubmit}
              >
                  <h2 style={{margin:"10px", justifyContent:"center", display:"flex"}}>Reset Password</h2>
                <div  style={{margin:"10px", justifyContent:"center", display:"flex"}}>
                
                  <TextField
                  style={{margin:"10px"}}
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div  style={{margin:"10px", justifyContent:"center", display:"flex"}}>
                
                  <TextField
                  style={{margin:"10px"}}
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <Button
                  type="submit"
                  value="Update"
                  className="resetPasswordBtn"
                >Submit</Button>
              </form>

        </Fragment>
      
    </Fragment>
  );
};

export default ResetPassword;