import { useEffect } from 'react';
import { useAuth } from '../Context/AuthProvider';
import axios from 'axios';

const useFetchUpdatedUser = () => {
  const { currentUser,updateProfile } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!currentUser?._id) {
          console.log("No valid user ID found");
          return;
        }
        const response = await axios.get(`thyverse-api.vercel.app/user/get-user/${currentUser._id}`);
        console.log("Response data:", response.data?.data);
        if (response.status === 200 && response.data?.data) {
          await updateProfile(response.data.data);
        } else {
          console.log("Invalid response received");
        }
      } catch (error) {
        console.error("Unable to fetch user", error);
      }
    };

    fetchUser();
  }, [currentUser]);
};

export default useFetchUpdatedUser;
