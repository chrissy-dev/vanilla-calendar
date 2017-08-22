window.addEventListener('load', function () {
  var date = new Date()
  var todaysDate = new Date()
  var calendar = document.querySelectorAll('[data-calendar-area="month"]')[0]
  var nextButton = document.querySelectorAll('[data-calendar-toggle="next"]')[0]
  var prevButton = document.querySelectorAll('[data-calendar-toggle="previous"]')[0]
  var activeDates

  date.setDate(1)
  createMonth()

  function createCalendarDay (num, day, year) {
    var newDay = document.createElement('div')

    var dateEl = document.createElement('span')
    dateEl.innerHTML = num
    newDay.className = 'cal__date'
    newDay.setAttribute('data-calendar-date', date)

    if (num === 1) {
      var offset = ((day - 1) * 14.28)
      if (offset > 0) {
        newDay.style.marginLeft = offset + '%'
      }
    }

    if (date.getTime() <= todaysDate.getTime() - 1) {
      newDay.classList.add('cal__date--disabled')
    } else {
      newDay.classList.add('cal__date--active')
      newDay.setAttribute('data-calendar-status', 'active')
    }

    if (date.toString() === todaysDate.toString()) {
      newDay.classList.add('cal__date--today')
    }

    newDay.appendChild(dateEl)
    calendar.appendChild(newDay)
  }

  // Creates and populates all of the days to make up the month
  function createMonth () {
    var currentMonth = date.getMonth()
    while (date.getMonth() === currentMonth) {
      createCalendarDay(date.getDate(), date.getDay(), date.getFullYear())
      date.setDate(date.getDate() + 1)
    }
    // while loop trips over and day is at 30/31, bring it back
    date.setDate(1)
    date.setMonth(date.getMonth() - 1)
    // Set the text to the correct month
    var currentMonthText = document.querySelectorAll('[data-calendar-label="month"]')[0]
    currentMonthText.innerHTML = monthsAsString(date.getMonth()) + ' ' + date.getFullYear()
    activeAction()
  }

  // Clears all days from the calendar
  function clearCalendar () {
    calendar.innerHTML = ''
  }

  // Clears the calendar and shows the next month
  nextButton.addEventListener('click', function () {
    clearCalendar()
    var nextMonth = date.getMonth() + 1
    date.setMonth(nextMonth)
    createMonth()
  })
  // Clears the calendar and shows the previous month
  prevButton.addEventListener('click', function () {
    clearCalendar()
    var prevMonth = date.getMonth() - 1
    date.setMonth(prevMonth)
    createMonth()
  })

  function activeAction () {
    activeDates = document.querySelectorAll('[data-calendar-status="active"]')
    for (var i = 0; i < activeDates.length; i++) {
      activeDates[i].addEventListener('click', function (event) {
        var picked = document.querySelectorAll('[data-calendar-label="picked"]')[0]
        picked.innerHTML = this.dataset.calendarDate
        removeActiveClass()
        this.classList.add('cal__date--selected')
      })
    }
  }

  function removeActiveClass () {
    for (var i = 0; i < activeDates.length; i++) {
      activeDates[i].classList.remove('cal__date--selected')
    }
  }

  // Converts month ids to the relevant string
  function monthsAsString (monthIndex) {
    return [
      'January',
      'Febuary',
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
    ][monthIndex]
  }
})
