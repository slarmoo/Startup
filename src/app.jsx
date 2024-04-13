import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login.jsx';
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

    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    configureWebSocket();
    let notifs = [];

    async function deleteCookie() {
        const del = await fetch("/user/expire", {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                "credentials": "include"
            },
        });
    }
    
    function configureWebSocket() {
        socket.onopen = (event) => {
            displayMsg('system', 'websocket', 'connected');
        };
        socket.onclose = (event) => {
            displayMsg('system', 'websocket', 'disconnected');
        };
        socket.onmessage = async (event) => {
            const msg = JSON.parse(await event.data.text());
            displayMsg('user', msg.from, "made a post!");
        };
        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    }

    function displayMsg(clss, from, msg) {
        console.log(notifs);
        notifs.push(`<div class="event"><span class="${clss}Event">${from}</span> ${msg}</div>`);
    }

    return (
        <BrowserRouter>
            <div className="body">
                <header>
                    <h1 id="title" className="text1" style={{ display: "inline" }}>Taco Talk</h1> <img src={logo} alt="TacoTalk logo" width="50" style={{ display: "inline" }} />
                </header>

                <main>
                    <nav className="sidebar">
                        <h2 className="text1">Browse</h2>
                        <h3 id="userName" className="text1">{userName}</h3>
                        <menu>
                            <li className="text1"><NavLink to="browse" className="link">Browse</NavLink></li>
                            <li className="text1"><NavLink to="post" className="link">Post</NavLink></li>
                            <li className="text1"><NavLink to="settings" className="link">Settings</NavLink></li>
                            <li className="text1"><NavLink onClick={() => deleteCookie()} to="/" className="link">Logout</NavLink></li>
                        </menu>
                        <div className="notif">{notifs}</div>
                    </nav>

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
                            <Route path='/create' element={<Create userName={userName} socket={socket} />} />
                            <Route path='/browse' element={<Browse userName={userName} />} />
                            <Route path='/post' element={<Post userName={userName} socket={socket} />} />
                            <Route path='/settings' element={<Settings userName={userName} />} />
                            <Route path='*' element={<NotFound />} />
                        </Routes>
                </main>

                <footer>
                    <label className="text1">Creator: Matthew Medford</label>
                    <a href="https://github.com/slarmoo/Startup/tree/main" className="link">Github</a>
                </footer>
            </div>
        </BrowserRouter>
    );
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}

export default App;