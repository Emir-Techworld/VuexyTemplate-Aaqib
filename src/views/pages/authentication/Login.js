import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { createLoginPayload } from "../../../api/payloads/authpayloads";
import { loginUser } from "../../../api/auth";
import { getHomeRouteForLoggedInUser } from '../../../utility/Utils';
import {
  Label,
  Input,
  Button,
  FormFeedback,
  Card,
  CardBody,
  CardTitle,
  Row
} from "reactstrap";
import InputPasswordToggle from "@components/input-password-toggle";
import toast from "react-hot-toast";
import "@styles/react/pages/page-authentication.scss";

const Login = () => {
  const navigate = useNavigate();
  const [disableButton, setDisableButton] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      username: "",
      password: ""
    }
  });


const onSubmit = async ({ username, password }) => {
  setDisableButton(true)

  try {
    const payload = createLoginPayload(username, password)
    const res = await loginUser(payload)

    if (res?.token && res?.expiration) {
      // Store everything in one object
      const userData = {
        token: res.token,
        expiration: res.expiration,
        userName: username
      }

      localStorage.setItem("userData", JSON.stringify(userData))

      toast.success("Logged in successfully!")
      
      navigate(getHomeRouteForLoggedInUser());

    } else {
      throw new Error("Invalid login response")
    }
  } catch (err) {
    console.error("Login error:", err)
    toast.error(err?.response?.data?.message || "Login failed")
  } finally {
    setDisableButton(false)
  }
}

  return (
    <div className="auth-wrapper auth-basic px-2">
      <div className="auth-inner my-2">
        <Card className="mb-0">
          <CardBody>
            <CardTitle tag="h4" className="mb-1">
              Welcome to Emir-Admin 👋
            </CardTitle>
            <Row tag="form" className="auth-login-form mt-2" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-1">
                <Label className="form-label" for="username">
                  Username
                </Label>
                <Controller
                  name="username"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      placeholder="Username"
                      invalid={!!errors.username}
                      {...field}
                    />
                  )}
                />
                {errors.username && <FormFeedback>Username is required</FormFeedback>}
              </div>
              <div className="mb-1">
                <Label className="form-label" for="password">
                  Password
                </Label>
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <InputPasswordToggle
                      className="input-group-merge"
                      invalid={!!errors.password}
                      {...field}
                    />
                  )}
                />
              </div>
              <Button type="submit" color="primary" block disabled={disableButton}>
                Sign in
              </Button>
            </Row>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Login;
