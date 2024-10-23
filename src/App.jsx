import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import LocationList from "./components/LocationList/LocationList";
import { Toaster } from "react-hot-toast";
import HotelsLayout from "./components/HotelsLayout/HotelsLayout";
import Hotels from "./components/Hotels/Hotels";
import SingleHotel from "./components/SingleHotel/SingleHotel";
import { HotelsProvider } from "./context/HotelsProvidee";
import BookmarkLayout from "./components/BookmarkLayout/BookmarkLayout";
import AddBookmark from "./components/AddBookmark/AddBookmark";
import BookmarksList from "./components/BookmarksList/BookmarksList";
import BookmarksProvider from "./context/BookmarksProvider";
import SingleBookmark from "./components/SingleBookmark/SingleBookmark";
import Login from "./components/Login/Login";
import AuthProvider from "./context/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BookmarksProvider>
        <HotelsProvider>
          <Toaster />
          <Header />
          <Routes>
            <Route path="/" element={<LocationList />} />
            <Route path="/hotels" element={<HotelsLayout />}>
              <Route index element={<Hotels />} />
              <Route path=":id" element={<SingleHotel />} />
            </Route>
            <Route
              path="/bookmarks"
              element={
                <ProtectedRoute>
                  <BookmarkLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<BookmarksList />} />
              <Route path=":id" element={<SingleBookmark />} />
              <Route path="add" element={<AddBookmark />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </HotelsProvider>
      </BookmarksProvider>
    </AuthProvider>
  );
}

export default App;
