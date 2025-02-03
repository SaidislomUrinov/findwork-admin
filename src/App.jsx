import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./utils/requests";
import { updateUser } from "./contexts/user";
import { errorMsg } from "./utils/msg";
import Auth from "./components/auth";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Top from "./components/top";
import Navbar from "./components/navbar";
import Categories from "./pages/categories";
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
      {username &&
        <div className="flex items-start justify-center w-full h-[100vh]">
          <Navbar />
          <div className="flex items-center justify-start flex-col gap-[10px] w-full lg:w-4/5 h-[100vh]">
            <Top />
            <div className="flex items-center pb-[10px] px-[10px] justify-start flex-col h-[100vh] w-full overflow-y-scroll">
              <Routes>
                <Route path="/categories" element={<Categories />} />
              </Routes>
            </div>
          </div>
        </div>
      }
      <Toaster containerStyle={{ zIndex: '99999' }} />
    </>
  )
}
export default App;