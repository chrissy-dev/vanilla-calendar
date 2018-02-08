/* eslint max-len:off */

const classes = {
  date: 'vcal-date',
  dateDisabled: 'vcal-date--disabled',
  dateActive: 'vcal-date--active',
  dateToday: 'vcal-date--today',
  dateSelected: 'vcal-date--selected'
}

class VanillaCalendar {
  constructor (calendarSelector) {
    this.months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]

    this.calendarEl = document.querySelector(calendarSelector)

    this.activeDates = null
    this.date = new Date()
    this.todaysDate = new Date()
  }

  /**
   * Valid options:
   * disablePastDays
   *
   */
  init (options) {
    this.options = options
    this.render()

    this.date.setDate(1)
    this.createMonth()
    this.createListeners()
  }

  onNext () {
    this.clearCalendar()
    const nextMonth = this.date.getMonth() + 1
    this.date.setMonth(nextMonth)
    this.createMonth()
  }

  onPrevious () {
    this.clearCalendar()
    const prevMonth = this.date.getMonth() - 1
    this.date.setMonth(prevMonth)
    this.createMonth()
  }

  createListeners () {
    this.nextBtnEl.addEventListener('click', this.onNext.bind(this))
    this.previousBtnEl.addEventListener('click', this.onPrevious.bind(this))
  }

  createDay (num, day) {
    const newDay = document.createElement('div')
    const dateEl = document.createElement('span')
    dateEl.innerHTML = num
    newDay.className = classes.date
    newDay.setAttribute('data-calendar-date', this.date)

    // if it's the first day of the month
    if (num === 1) {
      if (day === 0) {
        newDay.style.marginLeft = (6 * 14.28) + '%'
      } else {
        newDay.style.marginLeft = ((day - 1) * 14.28) + '%'
      }
    }

    if (this.options && this.options.disablePastDays &&
        this.date.getTime() <= this.todaysDate.getTime() - 1) {
      newDay.classList.add(classes.dateDisabled)
    } else {
      newDay.classList.add(classes.dateActive)
      newDay.setAttribute('data-calendar-status', 'active')
    }

    if (this.date.toString() === this.todaysDate.toString()) {
      newDay.classList.add(classes.dateToday)
    }

    newDay.appendChild(dateEl)
    this.monthContainerEl.appendChild(newDay)
  }

  dateClicked () {
    const _this = this
    this.activeDates = document.querySelectorAll(
      '[data-calendar-status="active"]'
    )
    for (let i = 0; i < this.activeDates.length; i++) {
      this.activeDates[i].addEventListener('click', function () {
        const picked = document.querySelectorAll(
          '[data-calendar-label="picked"]'
        )[0]
        picked.innerHTML = this.dataset.calendarDate
        _this.removeActiveClass()
        this.classList.add(classes.dateSelected)
      })
    }
  }

  createMonth () {
    const currentMonth = this.date.getMonth()
    while (this.date.getMonth() === currentMonth) {
      this.createDay(
        this.date.getDate(),
        this.date.getDay(),
        this.date.getFullYear()
      )
      this.date.setDate(this.date.getDate() + 1)
    }
    // while loop trips over and day is at 30/31, bring it back
    this.date.setDate(1)
    this.date.setMonth(this.date.getMonth() - 1)

    this.monthLabelEl.innerHTML =
      this.monthsAsString(this.date.getMonth()) + ' ' + this.date.getFullYear()
    this.dateClicked()
  }

  monthsAsString (monthIndex) {
    return this.months[monthIndex]
  }

  clearCalendar () {
    this.monthContainerEl.innerHTML = ''
  }

  removeActiveClass () {
    for (let i = 0; i < this.activeDates.length; i++) {
      this.activeDates[i].classList.remove(classes.dateSelected)
    }
  }

  render () {
    this.calendarEl.innerHTML = `<div class="vcal-header">
      <button class="vcal-btn" data-calendar-toggle="previous">
        <svg height="24" version="1.1" viewbox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"></path>
        </svg>
      </button>
      <div class="vcal-header__label" data-calendar-label="month">
        March 2017
      </div>
      <button class="vcal-btn" data-calendar-toggle="next">
        <svg height="24" version="1.1" viewbox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
        </svg>
      </button>
    </div>
    <div class="vcal-week">
      <span>Mon</span>
      <span>Tue</span>
      <span>Wed</span>
      <span>Thu</span>
      <span>Fri</span>
      <span>Sat</span>
      <span>Sun</span>
    </div>
    <div class="vcal-body" data-calendar-area="month"></div>`

    this.monthContainerEl = this.calendarEl.querySelectorAll('[data-calendar-area="month"]')[0]
    this.nextBtnEl = this.calendarEl.querySelectorAll('[data-calendar-toggle="next"]')[0]
    this.previousBtnEl = this.calendarEl.querySelectorAll('[data-calendar-toggle="previous"]')[0]
    this.monthLabelEl = this.calendarEl.querySelectorAll('[data-calendar-label="month"]')[0]
  }
}

export default VanillaCalendar