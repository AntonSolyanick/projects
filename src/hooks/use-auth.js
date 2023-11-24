import { useSelector } from "react-redux/es/hooks/useSelector";

export const useAuth = () => {
  const { email, token, id } = useSelector((state) => state.user);

  return {
    isAuth: !!email,
    email,
    token,
    id,
  };
};
