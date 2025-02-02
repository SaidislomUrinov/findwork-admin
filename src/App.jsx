import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./utils/requests";
import { updateUser } from "./contexts/user";
import { errorMsg } from "./utils/msg";
import Auth from "./components/auth";
import { Toaster } from "react-hot-toast";

function App() {
  const { username } = useSelector(e => e?.user);
  const dp = useDispatch();
  useEffect(() => {
    fetchData('GET', '/admin/verify').then(res => {
      const { ok, data } = res.data;
      if (ok) {
        dp(updateUser(data));
      }
    }).catch((e) => {
      console.log(e)
      errorMsg("Error fetching user")
    })
  }, []);
  return (
    <>
      {!username && <Auth />}
      <Toaster containerStyle={{zIndex:'99999'}}/>
    </>
  )
}
export default App;