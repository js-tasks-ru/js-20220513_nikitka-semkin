export default class ColumnChart {
  element

  constructor({ data = [], label = '', value = '', link = '' } = {}) {
    this.data = data
    this.label = label
    this.value = value
    this.link = link
    this._chartHeight = 50
    this.formatHeading(data)
    this.render()
    this.initEventListeners()
  }

  formatHeading = data => {
    return `USD ${data}`
  }

  get chartHeight() {
    return this._chartHeight
  }

  getTemplate() {
    return `
    <div class="${this.data.length ? 'column-chart' : 'column-chart_loading'}" style="height: ${this.chartHeight}px;">
    <div class="column-chart__title">
      ${this.label}
      <a href="/${this.link}" class="column-chart__link">View all</a>
    </div>
    <div class="column-chart__container">
      <div data-element="header" class="column-chart__header">${this.formatHeading(this.value)}</div>
      <div data-element="body" class="column-chart__chart">
        ${this.getColumnProps(this.data)}
      </div>
    </div>
  </div>
    `
  }

  render() {
    const element = document.createElement('div') //(*)

    // if (this.data.length === 0) {
    //   element.classList.add('column-chart_loading')
    // }

    element.innerHTML = this.getTemplate()

    this.element = element.firstElementChild
  }

  initEventListeners() {
    //NOTE: в данном методе добавляем обработчики событий, если они есть
  }

  remove() {
    this.element.remove()
  }

  update(data) {
    this.data = data
    this.render()
  }

  destroy() {
    this.remove()
    this.element = null
  }

  getColumnProps(data) {
    const maxValue = Math.max(...data)
    const scale = 50 / maxValue

    return data
      .map(item => {
        const percent = ((item / maxValue) * 100).toFixed(0) + '%'
        const value = String(Math.floor(item * scale))
        return this.getColumn(value, percent)
      })
      .join('')
  }

  getColumn(value, percent) {
    return `<div style="--value: ${value}" data-tooltip="${percent}"></div>`
  }

}
