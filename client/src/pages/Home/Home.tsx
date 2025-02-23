import { useAuth } from "@/hooks/use-auth";
import { AuthForm } from "../../components/Auth/AuthForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Music } from "lucide-react";

const Home = () => {
  const { checkAuth, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    checkAuth();
    if (isAuthenticated) {
      navigate("/dashboard"); // Redirect to dashboard
    }
  }, [navigate, isAuthenticated]);

  return (
    <main className="flex size-full h-[100dvh] items-center justify-center overflow-x-hidden px-8 py-8 sm:px-4 lg:px-0">
      {/* dotted bg */}
      <div
        className="absolute top-0 z-[-2] h-screen w-screen dark:bg-[#000000] dark:bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] 
				dark:bg-[size:20px_20px] bg-[#ffffff] bg-[radial-gradient(#00000033_1px,#ffffff_1px)] bg-[size:20px_20px]"
        aria-hidden="true"
      />
      <div className="flex flex-col  items-center space-y-4">
        <div className="flex gap-2 justify-center items-center">
          <Music className="size-12 lg:size-14 stroke-blue-500" />
          <h1 className="text-3xl md:text-4xl lg:text-6xl">MelodyVerse</h1>
        </div>
        <AuthForm />
      </div>
    </main>
  );
};

export default Home;
