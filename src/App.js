// import 'swiper/swiper.min.scss';
// import { BoxIconElement } from 'boxicons';

import 'swiper/css';

import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '~/assets/boxicons-2.1.2/css/boxicons.min.css';
import Footer from './component/Footer';
import Header from './component/Header';
import HomePage from './pages/Home';
import { publicRoutes } from './routes';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useEffect, useState } from 'react';

// Configure Firebase.
const config = {
    apiKey: 'AIzaSyBoFnh875kfGXtWVO_1OHujcXfA5tKCWkc',
    authDomain: 'tmovie-135bb.firebaseapp.com',
    // ...
};
firebase.initializeApp(config);
function App() {
    const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
    // Listen to the Firebase Auth state and set the local state.
    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
            setIsSignedIn(!!user);
            if (!user) {
                console.log('user not logged');
                return;
            }
            console.log(user.displayName);
            const token = await user.getIdToken();
            console.log(token);
        });
        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, []);
    return (
        <Router>
            <div className="App">
                <Header />
                <Routes>
                    {publicRoutes.map((publicRoute, index) => {
                        const Page = publicRoute.component;
                        let Layout = HomePage;
                        if (publicRoute.component) {
                            Layout = publicRoute.component;
                        } else if (publicRoute.component === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={publicRoute.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
