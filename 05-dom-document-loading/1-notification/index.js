export default class NotificationMessage {
  static instance
  element
  timer

  constructor(message = '', { duration = 1000, type = 'success' } = {}) {
    this.message = message
    this.duration = duration
    this.type = type

    this.render()
  }

  getTemplate() {
    return `
    <div class="notification ${this.type}" style="--value:${(this.duration / 1000).toFixed(0)}s">
        <div class="timer"></div>
            <div class="inner-wrapper">
            <div class="notification-header">${this.type}</div>
            <div class="notification-body">
                ${this.message}
            </div>
        </div>
    </div>
    `
  }

  show(target = document.body) {
    if (NotificationMessage.instance) {
      NotificationMessage.destroy()
    }

    NotificationMessage.instance = this

    this.timer = setTimeout(() => {
      this.remove()
    }, this.duration)

    target.append(this.element)
  }

  render() {
    const notifier = document.createElement('div')
    notifier.innerHTML = this.getTemplate()
    this.element = notifier.firstElementChild
  }

  remove() {
    clearInterval(this.timer)
    this.element.remove()
    NotificationMessage.instance = null
  }

  destroy() {
    this.remove()
  }
}
