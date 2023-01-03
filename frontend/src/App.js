import Routes from "./Components/Routes";
import { UidContext } from "./Components/AppContext";
import ProtectedRoutes from "./utils/AdminProtectedRoutes";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getAdmin } from "./actions/admin.action";
import SideBar from "./Components/SideBar";

function App() {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAdminToken = async () => {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          console.log(res);
          setUid(res.data);
        })
        .catch((err) => console.log("No Token"));
    };
    fetchAdminToken();
    if (uid) dispatch(getAdmin(uid));
  }, [uid, dispatch]);

  return (
    <>
      <UidContext.Provider value={uid}>
        <ProtectedRoutes />
      </UidContext.Provider>
      <Routes />
    </>
  );
}

export default App;
