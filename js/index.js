const js_list = [
    '../js/bootstrap.bundle.min.js',
    '../js/toast.js',
];

function loadScript(src, callback) {
    const script = document.createElement('script'); // 创建一个<script>元素 [[6]]
    script.src = src; // 设置<script>的src属性为指定的JS文件路径
    script.async = false; // 确保脚本按顺序加载（设置为false表示同步加载）[[4]]
    script.onload = callback; // 当脚本加载完成后执行回调函数

    document.head.appendChild(script); // 将<script>元素添加到<head>中
}

function loadScripts() {
    let index = 0;

    function next() {
        if (index < js_list.length) {
            loadScript(js_list[index], () => {
                index++;
                next(); // 加载下一个脚本
            });
        }
    }

    next(); // 开始加载第一个脚本
}

// 在HTML未完全加载时，立即开始加载JS文件
loadScripts();