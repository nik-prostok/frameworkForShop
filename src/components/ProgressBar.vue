<template>
  <div class="progress-bar">
    <div class="bar">
      <div
        class="progress"
        :style="{'width':value+'%'}"
      >
      <!-- <span class="percent">{{value}}%</span> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    value: {
      default: 0,
    },
  },
  data() {
    return {};
  },
};
</script>

<style>
.progress-bar {
 border-radius: 11px;
}
.progress {
  background: #0288d1;
}
.bar {
  width: 100%;
  background: #dfdfdf;
  overflow: hidden;
  padding: 5px;
  border-radius: 10px;
}

.progress {
  float: left;
  padding: 1px;
  transition: width 2s;
}

.percent {
  align-content: center;
  font-weight: 600;
  height: 30px;
  line-height: 30px;
}
</style>
