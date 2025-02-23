import axios from "@/axios/axios";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { AxiosError } from "axios";
import { Suspense, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface AccountData {
  email: string;
}

const Dashboard = () => {
  // account data
  const [accountData, setAccountData] = useState<AccountData | null>(null);
  const navigate = useNavigate();
  const { setIsAuthenticated, signOut, isAuthenticated } = useAuth();
  useEffect(() => {
    const fectchAccountData = async () => {
      try {
        const result = await axios.get("/dashboard-data", {
          withCredentials: true,
        });
        if (result.data.success) {
          setAccountData(result.data.user);
        }
      } catch (err) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data.error);
          setTimeout(() => {
            setIsAuthenticated(false);
          }, 2000);
        }
      }
    };
    fectchAccountData();
    if (!isAuthenticated)
      toast.warning("Your session has expired.", {
        action: (
          <Button asChild variant={"outline"} size={"sm"}>
            <Link to={"/"}>Login</Link>
          </Button>
        ),
      });
  }, [setAccountData, setIsAuthenticated, navigate, isAuthenticated]);

  return (
    <Suspense
      fallback={
        <div className="flex size-full h-[100dvh] items-center justify-center">
          <div className="animate-spin border-2 border-b-transparent" />
        </div>
      }
    >
      <div className="flex size-full h-[100dvh] flex-col items-center justify-center gap-2">
        <h1 className="text-2xl">Hello {accountData?.email}</h1>
        <Button onClick={signOut}>Signout</Button>
      </div>
    </Suspense>
  );
};

export default Dashboard;
