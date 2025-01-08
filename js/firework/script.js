async function loadParticles(options) {
  await loadFireworksPreset(tsParticles);

  await tsParticles.load(options);
}

const configs = {
  preset: "fireworks",
  particles: {
    // number: {
    //   value: 0,  // 调整烟花的数量
    // },
    // size: {
    //   value: 1,  // 增大或减小烟花粒子的大小
    // },
    // move: {
    //   enable: true,
    //   speed: 6,  // 提高速度让烟花爆炸得更快
    //   direction: "none",  // 没有特定方向，随机爆炸
    // },
    // opacity: {
    //   value: 1,  // 初始不透明度
    //   animation: {
    //     enable: true,
    //     speed: ,  // 控制粒子消失的速度
    //     minimumValue: 0,  // 使粒子完全消失
    //   },
    // },
    life: {
      duration: {
        value: 1, // 粒子持续时间
        sync: true,  // 所有粒子同时消失
      },
      delay: {
        value: 0,  // 无延迟
      },
    },
  },
};

loadParticles(configs);