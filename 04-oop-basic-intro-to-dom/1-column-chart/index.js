export default class ColumnChart {
  element
  chartHeight = 50

  constructor({ data = [], label = '', value = '', link = '' } = {}) {
    this.data = data
    this.label = label
    this.value = value
    this.link = link
    this.render()
    this.initEventListeners()
  }

  getTemplate() {
    return `
    <div class="column-chart" style="height: ${this.chartHeight}px;">
    <div class="column-chart__title">
      ${this.label}
      <a href="/${this.link}" class="column-chart__link">View all</a>
    </div>
    <div class="column-chart__container">
      <div data-element="header" class="column-chart__header">${this.value}</div>
      <div data-element="body" class="column-chart__chart">
        <div style="--value: 2" data-tooltip="6%"></div>
        <div style="--value: 22" data-tooltip="44%"></div>
        <div style="--value: 5" data-tooltip="11%"></div>
        <div style="--value: 50" data-tooltip="100%"></div>
        <div style="--value: 12" data-tooltip="25%"></div>
        <div style="--value: 4" data-tooltip="8%"></div>
        <div style="--value: 13" data-tooltip="28%"></div>
        <div style="--value: 5" data-tooltip="11%"></div>
        <div style="--value: 23" data-tooltip="47%"></div>
        <div style="--value: 12" data-tooltip="25%"></div>
        <div style="--value: 34" data-tooltip="69%"></div>
        <div style="--value: 1" data-tooltip="3%"></div>
        <div style="--value: 23" data-tooltip="47%"></div>
        <div style="--value: 27" data-tooltip="56%"></div>
        <div style="--value: 2" data-tooltip="6%"></div>
        <div style="--value: 1" data-tooltip="3%"></div>
      </div>
    </div>
  </div>
    `
  }

  render() {
    const element = document.createElement('div') //(*)

    element.innerHTML = this.getTemplate()

    //NOTE: в этой строке мы избавимся от обертки-пустышки в виде div
    // которой мы создали на строке (*)
    this.element = element.firstElementChild
  }

  initEventListeners() {
    //NOTE: в данном методе добавляем обработчики событий, если они есть
  }

  remove() {
    this.element.remove()
  }

  destroy() {
    this.remove()
    this.element = null
    //NOTE: удаляем обработчики событий, если они есть
  }
}
