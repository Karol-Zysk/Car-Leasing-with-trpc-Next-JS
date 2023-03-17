import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import type { ReactElement } from "react";

const AdminPage = ({ children }: { children: ReactElement }) => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  if (!sessionData || !sessionData.user || !sessionData.user.isAdmin) {
    const handleClick = () => {
      void router.push("/");
    };

    return <button onClick={handleClick}>Przejdź na inną stronę</button>;
  }

  return children;
};

export default AdminPage;
