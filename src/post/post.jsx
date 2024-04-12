import React from 'react';
import "./post.css"

export function Post() {
    return (
        <div className="bulk text1">
            <textarea id="postText"></textarea>
            <div>
                <input id="postImg" type="file" accept=".jpeg,.png,.tiff,.jpg" class="text1" onchange="preview()" />
                <button onclick="savePost()" class="text1" id="button">Post</button>
            </div>
            <div>
                <img src="" width="150" alt="your image here!" id="preview" />
            </div>
        </div>
    );
}