import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./utils/requests";
import { updateUser } from "./contexts/user";
import { errorMsg } from "./utils/msg";

function App() {
  const { username } = useSelector(e => e?.user);
  const dp = useDispatch();
  useEffect(() => {
    fetchData('GET', '/admin/verify').then(res => {
      const { ok, data } = res.data;
      if (ok) {
        dp(updateUser(data));
      }
    }).catch(() => {
      errorMsg("Error fetching user")
    })
  }, []);
  return (
    <>
    
    </>
  );
}
export default App;