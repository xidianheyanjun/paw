require('./sendRequestLoading.css');

const indicatorHtml = `<div class="vv-indicator">
<div class="vv-indicator-wrapper">
<span class="vv-indicator-spin">
<div class="vv-spinner-snake"></div>
</span>
</div>
<div class="vv-indicator-mask"></div>
</div>`;

class ClassIndicator {
  constructor() {
    this.visible = false;
    this.$el = null;
    this.instance = false;
  }

  open() {
    if (!this.instance) {
      this.$el = document.createElement('div');
      this.$el.innerHTML = indicatorHtml;
      document.body.appendChild(this.$el);
      this.instance = true;
    }
    if (!this.visible) {
      this.$el.style.display = 'block';
      this.visible = true;
    }
  }

  close() {
    if (this.visible) {
      this.$el.style.display = 'none';
      this.visible = false;
    }
  }
};

const Indicator = new ClassIndicator();

export default Indicator;
