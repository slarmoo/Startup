import React from "react";

export function MainStuff(above) {
    const [postText, setPostText] = React.useState("");
    const [previewSource, setPreviewSource] = React.useState("");
    const[error, setError] = React.useState(false);

    async function preview(e) {
        let file = e;
        const img = new Image();
        let imggg;
        img.src = URL.createObjectURL(file);

        img.onload = async function () {
            try {
                imggg = await compressImage(img, 0.15);
                setError(false);
                setPreviewSource(imggg);
            } catch {
                setError(true);
                console.log("ERROR");
            }
        }
    }

    async function savePost() {
        if (postText != "" && previewSource != "") {
            const img = new Image();
            let d = new Date();
            let day = d.getDate();
            if (day.length < 2) {
                day = "0" + day.toString();
            }
            let month = d.getMonth();
            let date = month.toString() + day.toString();
            date = Number(date);

            let username = await fetch("/user/me", {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    "credentials": "include"
                },
            });
            const userData = await username.json();
            const userName = userData.username;
            const delta = { text: postText, image: previewSource, date: date, user: userName };

            const newPost = fetch("/api/post", {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(delta),
            });
            setPreviewSource("");
            setPostText("");
            if (above.socket.readyState === WebSocket.OPEN) {
                broadcastEvent(userName);
            } else {
                console.warn('WebSocket not open yet.');
            }
        }
    }

    function compressImage(image, i) {
        return new Promise((resolve, reject) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = image.width;
            canvas.height = image.height;

            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

            const compressedDataURL = canvas.toDataURL('image/jpeg', i);
            if (compressedDataURL.length <= 9000) {
                resolve(compressedDataURL);
            } else {
                const img = new Image();
                img.src = compressedDataURL;
                img.onload = function () {
                    if (i > 0.1) {
                        resolve(compressImage(image, i - 0.05));
                    } else if (i > 0.001) {
                        resolve(compressImage(image, i / 2));
                    } else {
                        reject(new Error('Image compression failed'));
                    }

                }
            }
        });
    }

    function broadcastEvent(from) {
        const event = {
            from: from,
        };
       above.socket.send(JSON.stringify(event));
    }

    let d = new Date();
    let day = d.getDay();
    const dayParser = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let access = localStorage.getItem("day");
    if (!access) {
        access = "Friday";
    }
    if (dayParser[day] !== access) {
        return (
            <div className="browseBulk" style={{
                justifySelf: "center", alignSelf: "center", flex: "1", padding: "2em", textAlign: "center",
                justifyContent: "center", background: "#212121", border: "solid black 5px", margin: "2em", height: "80%",
            }}>Unable to access website today. Try again on {access}.</div>
        )
    } else if (error) { 
        return (<div className="text1" id="postBulk">
            <textarea id="postText" value={postText} onChange={(e) => setPostText(e.target.value)}></textarea>
            <div>
                <input id="postImg" type="file" accept=".jpeg,.png,.tiff,.jpg" className="text1" onChange={(e) => preview(e.target.files[0])} />
                <button onClick={() => savePost()} className="text1" id="button">Post</button>
            </div>
            <div>
                <img src="" width="150" alt="your image here!" id="preview" />
            </div>
            <p>File too large</p>
        </div>)
    } else {
        return (
            <div className="text1" id="postBulk">
                <textarea id="postText" value={postText} onChange={(e) => setPostText(e.target.value)}></textarea>
                <div>
                    <input id="postImg" type="file" accept=".jpeg,.png,.tiff,.jpg" className="text1" onChange={(e) => preview(e.target.files[0])} />
                    <button onClick={() => savePost()} className="text1" id="button">Post</button>
                </div>
                <div>
                    <img src={previewSource} width="150" alt="your image here!" id="preview" />
                </div>
            </div>
        )
    }    
}