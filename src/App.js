import './App.css';
import Sidebar from "./Sidebar";
import Chat from "./Chat"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
import useMediaQuery from "./useMediaQuery";


function App() {
  let isPageWide = useMediaQuery('(min-width: 800px)');
  const [{ user}, dispatch] = useStateValue();


  return (


    <div className="app">
      {!user ? (
        <Login />
      ):(
        !isPageWide ? (
          <div className="app_body">
            <Router>
                    <Switch>
                      <Route path="/app/rooms/:roomId">
                        <Chat />
                      </Route>
                      <Route path="/">
                        <Sidebar />
                      </Route>

                    </Switch>
            </Router>
          </div>
        ):
        <div className="app_body">
              <Router>
                <Sidebar />
                <Switch>
                  <Route path="/app/rooms/:roomId">
                    <Chat />
                  </Route>

                  <Route path="/">
                    <Chat />
                  </Route>

                </Switch>
              </Router>
        </div>
      )}
    </div>
  )

}

export default App;

// return (
//   // BEM Naming convention
//   <div className="app">
//     {!user ? (
//       <Login />
//     ) : (
//       <div className="app_body">
//       <Router>
//         <Sidebar />
//         <Switch>
//           <Route path="/app/rooms/:roomId">
//             <Chat />
//           </Route>
//
//           <Route path="/">
//             <Chat />
//           </Route>
//
//         </Switch>
//       </Router>
//       </div>
//     )}
//   </div>
// );






// !isPageWide ? (
//   <div className="app_body">
//     <Router>
//         <Switch>
//           <Route path="/app/rooms/:roomId">
//             <Chat />
//           </Route>
//           <Route path="/app">
//             <Sidebar />
//           </Route>
//
//         </Switch>
//     </Router>
//   </div>
// ):(
//   <div className="app_body">
//     <Router>
//       <Sidebar/>
//       <Switch>
//         <Route path="/rooms/:roomId">
//           <Chat/>
//         </Route>
//         <Route path="/">
//           <Chat/>
//         </Route>
//       </Switch>
//     </Router>
//   </div>
// )
