import Container from "../../components/Container";
import SignInForm from "../../components/SignInForm";

const Login = () => {
  return (
    <Container title={"Sign In"}>
      <div className="min-h-full flex flex-wrap flex-row items-center justify-around py-12 md:px-4">
        <div className="flex flex-col justify-center">
          <h1 className="text-[2.5rem] tracking-tight sm:text-6xl md:text-7xl font-extrabold text-gray-900">
            Puente Wedding
          </h1>
          <h1 className="text-4xl tracking-tight sm:text-6xl md:text-7xl  font-extrabold text-gray-900 mt-0">
            Fitness Challenge
          </h1>
        </div>
        <SignInForm />
      </div>
    </Container>
  );
};

export default Login;
