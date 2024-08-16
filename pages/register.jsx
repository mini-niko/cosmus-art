import RegisterForm from "components/RegisterForm";
import UnprotectedRout from "components/UnprotectedRout";

function register() {
  return (
    <UnprotectedRout>
      <div className="h-screen flex flex-col items-center justify-center">
        <RegisterForm />
      </div>
    </UnprotectedRout>
  );
}

export default register;
