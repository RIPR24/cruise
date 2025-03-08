import { useState } from "react";

type info = {
  username: string;
  password: string;
};

const Login = ({ voy }: { voy: boolean }) => {
  const [disable, setDisable] = useState(false);
  const [prob, setProb] = useState("");
  const [info, setInfo] = useState<info>({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInfo({ ...info, [e.target.id]: val });
  };

  const login = async () => {
    setDisable(false);
  };

  return (
    <div className="con">
      <p>Login</p>
      <div className="logcon">
        <input
          type="username"
          placeholder="Username"
          onChange={handleChange}
          name="username"
          id="username"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={handleChange}
          name="password"
          id="password"
        />
        <p style={{ color: "red" }}>{prob}</p>
        <button
          disabled={disable}
          className={disable ? "disb" : ""}
          onClick={() => {
            if (!disable) {
              login();
            }
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
