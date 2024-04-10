import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Create } from './create/create';
import { Browse } from './browse/browse';
import { Post } from './post/post';
import { Settings } from './settings/settings';
import { AuthState } from './login/authState';
import './app.css';
import logo from "./taco.png"

function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);

    return (
        <BrowserRouter>
            <div>
                <header>
                    <h1 id="title" class="text1" style="display:inline">Taco Talk</h1> <img src={logo} alt="TacoTalk logo" width="50" style="display:inline" />
                </header>

                <Routes>
                    <Route path='/'
                        element={
                            <Login
                                userName={userName}
                                authState={authState}
                                onAuthChange={(userName, authState) => {
                                    setAuthState(authState);
                                    setUserName(userName);
                                }}
                            />
                        }
                        exact
                    />
                    <Route path='/create' element={<Create userName={userName} />} />
                    <Route path='/browse' element={<Browse userName={userName} />} />
                    <Route path='/post' element={<Post userName={userName} />} />
                    <Route path='/settings' element={<Settings userName={userName} />} />
                    <Route path='*' element={<NotFound />} />                    
                </Routes>

                <footer>

                </footer>
            </div>
        </BrowserRouter>
    );
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}

export default App;