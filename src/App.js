import { Routes, Route, Link, Outlet, useNavigate } from "react-router-dom";

import LoginPage from './components/Login/LoginPage';
import PostListPage from "./components/PostList/PostListPage";
import PostDetailPage from "./components/PostDetail/PostDetailPage";
import AddNewPost from "./components/AddNewPost/AddNewPostPage";
import FooterPage from "./components/Welcome/FooterPage";
import AuthService from "./services/AuthService";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import { useEffect, useState } from "react";
import PostSearch from "./components/PostSearch/PostSearch";

const App = () => {
  var hours = 1; // to clear the localStorage after 1 hour
  var now = new Date().getTime();
  var setupTime = localStorage.getItem('setupTime');
  if (setupTime == null) {
    localStorage.setItem('setupTime', now);
  } else {
    if (now - setupTime > hours * 60 * 60 * 1000) {
      localStorage.clear();
      localStorage.setItem('setupTime', now);
    }
  }
  let navigate = useNavigate();
  const [searchTitle, setSearchTitle] = useState("");
  //get current user
  const [loggedIn, setCheck] = useState(false);
  const checkLoggedIn = () => {
    //var user = {};
    if (localStorage.getItem("user")) {
      // user = JSON.parse(localStorage.getItem("user"));
      setCheck(true);
    }
    else {
      setCheck(false);
    }
  }

  useEffect(() => {
    checkLoggedIn();
  }, [loggedIn]);

  const clearSearchField = () => {
    setSearchTitle("");
  }

  const logOut = () => {
    AuthService.logout();
    setCheck(false);
  };
  
  const onChangeTitle = (e) => {
    const title = e.target.value;
    setSearchTitle(title);
  };

  return (
    <div><header>
      <div style={{ height: "400px" }}>
        <nav className="navbar navbar-expand-sm navbar-light"
          style={{ display: "block", position: "relative", left: "70%", width: "20%", fontWeight: 900 }}>
          <ul className="navbar-nav">
            <li className="nav-item border-right"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item border-right"><Link className="nav-link" to="/posts">Post</Link></li>
            <li className="nav-item border-right"><Link className="nav-link" to="/about">About</Link></li>
            <li className="nav-item border-right"><Link className="nav-link" to="/contact">Contact</Link></li>
            {loggedIn ? (
              <><li className="nav-item"><Link className="nav-link" to="/profile">Profile</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/login" onClick={logOut}>Logout</Link></li></>
            ) : (
              <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
            )}
          </ul>
          <form className="form-inline">
            <input className="form-control mr-sm-2" type="search"
              name="searchTitle" value={searchTitle} onChange={onChangeTitle}
              placeholder="Search" aria-label="Search" />
            <Link to="/posts/search" state={{ searchTitle: searchTitle }} onClick={clearSearchField}><button className="btn btn-light" type="button"><i
              className="fas fa-search"></i></button></Link>
          </form>
          <span id="search-text"
            style={{ color: "whitesmoke", visibility: "hidden" }}><strong>Searching...</strong></span><br></br>
          <span id="search-text-valid" style={{ color: "whitesmoke", visibility: "hidden" }}><strong>You must enter at
            least one character</strong></span>
        </nav>
        <h1
          style={{
            textAlign: "center", color: "#001a33",
            fontFamily: "Brush Script MT", fontSize: "7pc"
          }}>
          Hai Duong</h1>
      </div>
    </header>
      <div className="container">
        <Routes>
          <Route path="/" element={<PostListPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/posts" element={<Outlet />} >
            <Route index element={<PostListPage />} />
            <Route path=":postId" element={<PostDetailPage />} />
            <Route path="add" element={<AddNewPost />} />
            <Route path="search" element={<PostSearch />} />
          </Route>
          <Route path="profile" element={<ProfilePage />} />
        </Routes>
      </div>
      <FooterPage />
    </div>
  );
}

export default App;
