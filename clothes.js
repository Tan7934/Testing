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
        // 计算随机坐标，保持在窗口范围内
        var x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
        var y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
        
        noBtn.style.position = 'fixed'; // 变成绝对定位才能跑
        noBtn.style.left = x + 'px';
        noBtn.style.top = y + 'px';
    }
}

// 3. 情书内容与设置
var loveLetter = "你好,很抱歉是以这种方法，但是请问你愿意在2月14号和我出去吗？";
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
        setInterval(createHeart, 300); // 撒花

        var photo = document.getElementById('cat-photo');
        if (photo) { photo.style.display = 'block'; } // 现照片

        var noBtn = document.getElementById('no-btn');
        if (noBtn) {
            noBtn.style.display = 'inline-block'; // 现拒绝按钮
            noBtn.onmouseover = moveButton; // 绑定逃跑事件
        }
        console.log("打字完成，效果开启！");
    }
}

// 5. 核心启动逻辑
window.onload = function () {
    var btn = document.getElementById('start-btn');
    var outputElement = document.getElementById('letter-output');

    if (btn) {
        btn.onclick = function () {
            btn.style.display = 'none'; // 藏按钮

            // 播放音乐
            try {
                var audio = new Audio('happy-bday.mp3'); 
                audio.loop = true;
                audio.play().catch(function(e) { console.log("播放拦截:", e); });
            } catch (err) {
                console.log("音频出错:", err);
            }

            // 启动打字机
            if (outputElement) {
                typeWriter(loveLetter, 0, outputElement, typingSpeed);
            }
        };
    }
};