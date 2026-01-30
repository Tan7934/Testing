/*jslint browser: true, devel: true */
"use strict";

// 1. 产生爱心的逻辑 (放在最前面)
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

// 2. 准备情书内容
var loveLetter = "你好，新年快乐，祝你妈妈生日快乐，希望她福如东海，寿比南山，心想事成，身体健康以及快快乐乐一辈子(this might be the most random thing u see today)猫猫照片给你母亲:O!!";

// 3. 设置打字速度
var typingSpeed = 100;

// 4. 打字机函数
function typeWriter(text, i, element, speed) {
    if (i < text.length) {
        element.textContent += text.charAt(i);
        setTimeout(function () {
            typeWriter(text, i + 1, element, speed);
        }, speed);
    } else {
        // --- 打字结束后的逻辑 ---
        setInterval(createHeart, 300);

        var photo = document.getElementById('cat-photo');
        if (photo) {
            photo.style.display = 'block';
        }
        console.log("打字完成，开始撒花！");
    } // <--- 这里是你之前漏掉的第一个大括号
} // <--- 这里是你之前漏掉的第二个大括号

// 5. 确保页面加载完后再运行
window.onload = function () {
    var btn = document.getElementById('start-btn');
    var audio = new Audio('happy-bday.mp3'); 
    audio.loop = true; 

    if (btn) {
        btn.onclick = function () {
            btn.style.display = 'none'; 
            audio.play().catch(function(e) {
                console.log("音频播放被拦截:", e);
            }); 

            var outputElement = document.getElementById('letter-output');
            typeWriter(loveLetter, 0, outputElement, typingSpeed);
        };
    }
};