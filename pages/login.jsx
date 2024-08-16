import LoginForm from "components/LoginForm";
import UnprotectedRout from "components/UnprotectedRout";

function login() {
  return (
    <UnprotectedRout>
      <div className="h-screen flex flex-col items-center justify-center">
        <LoginForm />
      </div>
    </UnprotectedRout>
  );
}

export default login;
