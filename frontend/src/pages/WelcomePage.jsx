import LoginForm from "../components/auth/LoginForm.jsx";
import {useLoaderData} from "react-router-dom";
import Main from "../components/auth/Main.jsx";

const WelcomePage = () => {

  const userData = useLoaderData();

  return (
    <>
      {userData ? <Main userData={userData} /> : <LoginForm />}
    </>
  );
};

export default WelcomePage;
