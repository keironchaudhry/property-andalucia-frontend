import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";

import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import LoginForm from "./pages/auth/LoginForm";
import PropertyCreateForm from "./pages/property/PropertyCreateForm";
import PropertyPage from "./pages/property/PropertyPage";
import PropertyList from "./pages/property/PropertyList";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import PropertyEditForm from "./pages/property/PropertyEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <PropertyList message="No results found, please try adjusting your province filter." />
            )}
          />
          <Route
            exact
            path="/feed"
            render={() => (
              <PropertyList
                message="No results found, you will find properties from sellers you follow here."
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route
            exact
            path="/saved"
            render={() => (
              <PropertyList
                message="No results found, any properties you save will be listed here."
                filter={`saves__owner__profile=${profile_id}&ordering=-saves__created_at&`}
              />
            )}
          />
          <Route exact path="/login" render={() => <LoginForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route
            exact
            path="/property/create"
            render={() => <PropertyCreateForm />}
          />
          <Route exact path="/property/:id" render={() => <PropertyPage />} />
          <Route
            exact
            path="/property/:id/edit"
            render={() => <PropertyEditForm />}
          />
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route
            exact
            path="/profiles/:id/edit/username"
            render={() => <UsernameForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit/password"
            render={() => <UserPasswordForm />}
          />
          <Route render={() => <p>Page not found.</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
