class ToastManager {
    constructor() {
        // 创建或获取 Toast 容器
        this.container = document.querySelector('.toast-container');
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
            document.body.appendChild(this.container);
        }
    }

    /**
     * 显示 Toast 提示框
     * @param {string} message - 提示内容
     * @param {string} header - 标题内容（可选）
     * @param {number} delay - 自动隐藏的延迟时间（单位：毫秒，默认 5000）
     * @param {function} callback - 点击“前往”按钮后的回调函数（可选）
     */
    showToast({ message, header = '提示', delay = 5000, callback }) {
        // 动态创建 Toast 的 DOM 结构
        const toastHTML = `
            <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <strong class="me-auto">${header}</strong>
                    ${callback ? '<a href="javascript:void(0);" class="btn btn-sm btn-link goto-btn">前往</a>' : ''}
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    ${message}
                </div>
            </div>
        `;

        // 将 Toast 插入到容器中
        this.container.insertAdjacentHTML('beforeend', toastHTML);

        // 获取刚刚插入的 Toast 元素
        const toastEl = this.container.lastElementChild;

        // 如果有回调函数，为“前往”按钮绑定事件
        if (callback) {
            const gotoButton = toastEl.querySelector('.goto-btn');
            if (gotoButton) {
                gotoButton.addEventListener('click', () => {
                    callback(); // 执行传入的回调函数
                });
            }
        }

        // 初始化并显示 Toast
        const toast = new bootstrap.Toast(toastEl, {
            autohide: true,
            delay: delay
        });
        toast.show();

        // 自动移除已关闭的 Toast 元素
        toastEl.addEventListener('hidden.bs.toast', () => {
            toastEl.remove();
        });
    }
}

window.toast = new ToastManager();

// 随机弹出 Toast 提示框
const randomToasts = [
    {
        header: '邀请',
        message: '您好👋，我们是一个独立博客收录平台，非常欢迎您加入我们！',
        delay: 5000,
        callback: () => {
            window.location.href = 'https://docs.jiuchan.org/join.html';
        }
    },
    {
        header: '提示',
        message: '如果发现前往的网站出现了异常行为，还请及时反馈给我们！',
        delay: 5000,
        callback: () => {
            window.location.href = 'mailto:hi@jiuchan.org';
        }
    },
    {
        header: '嘿🙋',
        message: '今天过得还好吗？',
        delay: 3500,
    }
]
const randomToast = () => {
    // 定义随机弹出的概率为50%
    const probability = 0.5;
    const storeKey = 'random-toast';
    const expireTime = 30 * 60; // 设置过期时间为30分钟

    // 获取存储的值，是一个数组，格式为 [{toast: toast, time: time}]
    const _storedValue = localStorage.getItem(storeKey);
    let storedValue = _storedValue ? JSON.parse(_storedValue) : [];

    // 检查是否所有内容都已弹出且未过期
    if (
        storedValue.length === randomToasts.length &&
        storedValue.every(item => (Date.now() - item.time) / 1000 < expireTime)
    ) {
        return; // 如果所有内容都已弹出且未过期，则不执行后续逻辑
    }

    // 根据概率决定是否弹出
    if (Math.random() < probability) {
        const index = Math.floor(Math.random() * randomToasts.length); // 随机选择一个内容
        const selectedToast = randomToasts[index];

        // 检查当前选中的内容是否已存在
        const existingIndex = storedValue.findIndex(item => item.toast.header === selectedToast.header);

        if (existingIndex !== -1) {
            // 如果已存在，检查是否过期
            const existingItem = storedValue[existingIndex];
            if ((Date.now() - existingItem.time) / 1000 < expireTime) {
                return; // 如果未过期，则不弹出内容
            } else {
                // 如果已过期，则更新时间戳
                storedValue[existingIndex].time = Date.now();
            }
        } else {
            // 如果不存在，则新增记录
            storedValue.push({ toast: selectedToast, time: Date.now() });
        }

        // 更新 localStorage
        localStorage.setItem(storeKey, JSON.stringify(storedValue));

        window.toast.showToast(selectedToast);
    }
};

// 页面加载完成后 显示 Toast
window.addEventListener('load', () => {
    randomToast()
})