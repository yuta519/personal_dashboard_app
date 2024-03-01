import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { addUser } from "../store/features/userSlice";

export default function useUsers() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const signup = (name: string, email: string, avatar: string) => {
    // check email is valid email address format
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email))
      throw new Error("Invalid email address");

    if (!avatar.length)
      // https://ashallendesign.co.uk/blog/13-placeholder-avatar-and-image-websites
      avatar = `https://eu.ui-avatars.com/api/?name=${name}&size=250`;

    dispatch(addUser({ name, email, avatar }));
  };

  return { user, signup };
}
