import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from '@/services/auth.service'
import SpainFlag from '@/assets/images/flags/spain.jpg';
import UsFlag from '@/assets/images/flags/us.jpg';
import modern from '@/assets/images/modern.svg';
import IconifyIcon from '@/components/client-wrapper/IconifyIcon';
import PageMeta from '@/components/PageMeta';
import { appName, currentYear } from '@/helpers/constants';
import { Link } from 'react-router';
import { TbCircleFilled } from "react-icons/tb";
import { jwtDecode } from "jwt-decode";

const Index = () => {
   const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  /* -----------------------------
   LOGIN FUNCTION
  ----------------------------- */

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  setLoading(true);
  setError("");

  try {
    const data = await login({email,password});

    if (data.accessToken && data.refreshToken) {
      // Stockage tokens
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      // ✅ DECODER LE TOKEN (TRÈS IMPORTANT)
      const decoded: any = jwtDecode(data.accessToken);

      const user = {
        id: decoded.sub,
        email: decoded.email,
        roles: decoded.roles,
      };

      // ✅ Stocker user
      localStorage.setItem("user", JSON.stringify(user));

      console.log("USER:", user);

      // 🔥 Redirection selon role 
      if (user.roles.includes("SUPER_ADMIN")) {
        navigate("/admin/dashboard");
      } else if (user.roles.includes("SCHOOL_ADMIN")) {
        navigate("/school/dashboard");
      } else if (user.roles.includes("TEACHER")) {
        navigate("/teacher/dashboard");
      } else if (user.roles.includes("STUDENT")) {
        navigate("/student/dashboard");
      }
      else{
        navigate("/dashboard");
      }

    } else {
      setError("Tokens non reçus");
    }

  } catch (err: any) {
    if (err.response && err.response.data) {
      const msg = Array.isArray(err.response.data.message)
        ? err.response.data.message.join(", ")
        : err.response.data.message;

      setError(msg);
    } else {
      setError(err.message || "Une erreur inconnue est survenue");
    }
  } finally {
    setLoading(false);
  }
}
  return (
    <>
      <PageMeta title="Login" />
      <div className="relative flex flex-row w-full overflow-hidden bg-gradient-to-r from-blue-900 h-screen to-blue-800 dark:to-blue-900 dark:from-blue-950">
        <div className="absolute inset-0 opacity-20">
          <img src={modern} alt="" />
        </div>

        <div className="mx-2 m-2 w-170 py-6 px-10 bg-card flex justify-center rounded-md text-center relative z-10">
          <div className="flex flex-col h-full w-full">
            <div className="my-1">
              <div className="mt-4">
                <div className="mt-5 w-100 mx-auto">
                  <div
                    id="tabsForEmail"
                    role="tabpanel"
                    aria-labelledby="tabs-with-underline-item-1"
                  >
                    <form onSubmit={handleLogin} className="text-left w-full mt-10">

                       {/* ERROR MESSAGE */}

                        {error && (
                          <div className="py-1 px-3 mb-4 external-event fc-event font-medium bg-danger/10 text-danger rounded" data-class="!text-danger">
                            <span><TbCircleFilled className="inline-block me-2" /> {error}.</span>
                          </div>
                        )}

                      <div className="mb-4">
                        <label
                          htmlFor="Username"
                          className="block  font-medium text-default-900 text-sm mb-2"
                        >
                          Email ID
                        </label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="Enter an email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div className="mb-4">
                        <Link
                          to="/modern-reset-password"
                          className="text-primary font-medium text-sm mb-2 float-end"
                        >
                          Forgot Password ?
                        </Link>
                        <label
                          htmlFor="Password"
                          className="block  font-medium text-default-900 text-sm mb-2"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-input"
                          placeholder="Enter Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>

                      <div className="flex gap-2 mb-4">
                        <input id="checkbox-1" type="checkbox" className="form-checkbox" />
                        <label
                          className="text-default-900 text-sm font-medium"
                          htmlFor="checkbox-1"
                        >
                          Remember Me
                        </label>
                        
                        {/* <span className="flex justify-end text-base text-default-500">
                          Don't have an account ?
                          <Link
                            to="/modern-register"
                            className="font-semibold underline hover:text-primary transition duration-200"
                          >
                            {' '}
                            SignUp
                          </Link>
                        </span> */}
                      </div>

                      <div className="mt-5 text-center">
                        <button type="submit" 
                      disabled={loading} className="btn bg-primary text-white w-full">
                          {loading ? 'Loading...' : 'Sign In'}
                        </button>
                      </div>

                      <div className="my-3 relative text-center  before:absolute before:top-2.5 before:left-0 before:border-t before:border-t-default-200 before:w-full before:h-0.5 before:right-0 before:-z-0">
                        <h4 className="relative z-1 py-0.5 px-2 inline-block font-medium bg-card text-default-500 rounded-md">
                          Sign In with
                        </h4>
                      </div>

                      <div className="flex w-full justify-center items-center gap-2">
                        <Link
                          to="#"
                          className="btn border border-default-200 flex-grow hover:bg-default-150 shadow-sm hover:text-default-800"
                        >
                          <IconifyIcon icon={'logos:google-icon'} />
                          Use Google
                        </Link>

                        <Link
                          to="#"
                          className="btn border border-default-200 flex-grow hover:bg-default-150 shadow-sm hover:text-default-800"
                        >
                          <IconifyIcon icon={'logos:apple'} className="text-mono" />
                          Use Apple
                        </Link>
                      </div>

                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-center">
              <span className="text-sm text-default-500 flex gap-1">
                <IconifyIcon icon="lucide:copyright" className="w-4 h-4 align-middle" />
                {currentYear} © {appName}.
              </span>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen px-10 py-14 grow">
          <div>
            <Link to="/index" className="index">
              {/* <img src={LogoLight} alt="" className="h-7 mb-14 mx-auto block" width={130} /> */}
            </Link>

            {/* <img src={modernImg} alt="" className="mx-auto rounded-xl block object-cover w-md" /> */}
            <div className="mt-5 text-center">
              <h3 className="mb-3 text-blue-50 text-2xl font-semibold text-center">
                Welcome to {appName}
              </h3>
              <p className="text-blue-300 text-base w-2xl text-center">
               Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus inventore eos ratione, impedit eveniet 
               tenetur rerum et magnam fugit eum natus porro asperiores officiis aliquid repellendus mollitia eaque neque 
               expedita.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
