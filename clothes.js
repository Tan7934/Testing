/*jslint browser: true, devel: true */
"use strict";

// 1. 产生爱心的逻辑
function createHeart() {
    var heart = document.createElement('div');
    heart.innerHTML = '💖'; 
    heart.className = 'heart'; 
    heart.style.left = Math.random() * 100 + 'vw';
    var size = Math.random() * 20 + 10;
    heart.style.fontSize = size + 'px';
    var duration = Math.random() * 3 + 2;
    heart.style.animationDuration = duration + 's';
    document.body.appendChild(heart);
    setTimeout(function() {
        heart.remove();
    }, duration * 1000);
}

// 2. 拒绝按钮“逃跑”的逻辑
function moveButton() {
    var noBtn = document.getElementById('no-btn');
    if (noBtn) {
        var x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
        var y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
        noBtn.style.position = 'fixed'; 
        noBtn.style.left = x + 'px';
        noBtn.style.top = y + 'px';
    }
}

// 3. 情书内容与设置
var loveLetter = "你好，发这段代码给你是想认真地问一下：2月14号那天，你愿意和我一起出去吗？希望能收到你的回复，期待你的答案。";
var typingSpeed = 150;

// 4. 打字机函数
function typeWriter(text, i, element, speed) {
    if (i < text.length) {
        element.textContent += text.charAt(i);
        setTimeout(function () {
            typeWriter(text, i + 1, element, speed);
        }, speed);
    } else {
        // --- 打字结束后的惊喜 ---
        setInterval(createHeart, 300); 

        var photo = document.getElementById('cat-photo');
        if (photo) { photo.style.display = 'block'; }

        // 显示包含两个按钮的区域
        var actionArea = document.getElementById('action-area');
        if (actionArea) {
            actionArea.style.display = 'block';
        }

        var noBtn = document.getElementById('no-btn');
        if (noBtn) {
            noBtn.onmouseover = moveButton; 
        }

        var acceptBtn = document.getElementById('accept-btn');
        if (acceptBtn) {
            acceptBtn.onclick = function() {
                alert("太好了！那我们2月14号见，不见不散！✨");
                setInterval(createHeart, 100); 
            };
        }
        console.log("打字完成，效果开启！");
    } // 修正点：确保这个大括号对应 else 的结束
}

// 5. 核心启动逻辑
window.onload = function () {
    var btn = document.getElementById('start-btn');
    var outputElement = document.getElementById('letter-output');

    if (btn) {
        btn.onclick = function () {
            btn.style.display = 'none'; 

            try {
                var audio = new Audio('happy-bday.mp3'); 
                audio.loop = true;
                audio.play().catch(function(e) { console.log("播放拦截:", e); });
            } catch (err) {
                console.log("音频出错:", err);
            }

            if (outputElement) {
                typeWriter(loveLetter, 0, outputElement, typingSpeed);
            }
        };
    }
};