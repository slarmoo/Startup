import React from 'react';
import "./browse.css"
let postsData = [];
export function Browse() {
    React.useEffect(() => {
        main();
    }, []);

    // const [newDay, setNewDay] = React.useState("Tuesday");

    async function main() {
        let username = await fetch("/user/me", {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                "credentials": "include"
            },
        });
        if (username.ok) {
            console.log("ok");
        } else {
            window.location.href = "index.html"
        }
    }

    const [posts, setPosts] = React.useState([]);

    React.useEffect(() => {
        async function fetchData() {
            const postResponse = await fetch("/api/post");
            const postData = await postResponse.json();
            setPosts(postData);
        }
        fetchData();
    }, []);

    function renderPosts() {
        return posts.map((post, index) => (
            <div key={index} className="card">
                <div>
                    <p className="postText text1">{post.text}</p>
                </div>
                <div>
                    <img src={post.image} id={`postImage${index}`} alt="someone's post" width="150" />
                </div>
                <div>
                    <label className="text1">{post.user}</label>
                </div>
            </div>
        ));
    }
    // getDate();
    // async function getDate() {
    //     const response = await fetch('/user/settings', {
    //         method: 'GET',
    //         headers: { 'content-type': 'application/json' },
    //     });
    //     const settings = await response.json();
    //     console.log(settings);
    //     setNewDay(settings["day"]);
    // }

    // let d = new Date();
    // let day = d.getDay();
    // const dayParser = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    // let access = newDay;
    // if (!access) {
    //     access = "Tuesday";
    // }
    if (false) {
        return (
            <div className="browseBulk" style={{
                justifySelf: "center", alignSelf: "center", flex: "1", padding: "2em", textAlign: "center",
                justifyContent: "center", background: "#212121", border: "solid black 5px", margin: "2em", height: "80%",
            }}>Unable to access website today. Try again on {access}.</div>
        )
    } else {
        return (
            <div className="browseBulk">
                { renderPosts() }
            </div>
        )
    }
}