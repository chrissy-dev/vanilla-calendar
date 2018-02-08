(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["VanillaCalendar"] = factory();
	else
		root["VanillaCalendar"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* eslint max-len:off */

const classes = {
  date: 'vcal-date',
  dateDisabled: 'vcal-date--disabled',
  dateActive: 'vcal-date--active',
  dateToday: 'vcal-date--today',
  dateSelected: 'vcal-date--selected'
}

class VanillaCalendar {
  constructor (calendarEl) {
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

    this.calendar = document.querySelector(calendarEl)

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
    this.next.addEventListener('click', this.onNext.bind(this))
    this.previous.addEventListener('click', this.onPrevious.bind(this))
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
    this.month.appendChild(newDay)
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

    this.label.innerHTML =
      this.monthsAsString(this.date.getMonth()) + ' ' + this.date.getFullYear()
    this.dateClicked()
  }

  monthsAsString (monthIndex) {
    return this.months[monthIndex]
  }

  clearCalendar () {
    this.month.innerHTML = ''
  }

  removeActiveClass () {
    for (let i = 0; i < this.activeDates.length; i++) {
      this.activeDates[i].classList.remove(classes.dateSelected)
    }
  }

  render () {
    this.calendar.innerHTML = `<div class="vcal-header">
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

    this.month = this.calendar.querySelectorAll('[data-calendar-area="month"]')[0]
    this.next = this.calendar.querySelectorAll('[data-calendar-toggle="next"]')[0]
    this.previous = this.calendar.querySelectorAll('[data-calendar-toggle="previous"]')[0]
    this.label = this.calendar.querySelectorAll('[data-calendar-label="month"]')[0]
  }
}

/* harmony default export */ __webpack_exports__["default"] = (VanillaCalendar);

/***/ })
/******/ ]);
});