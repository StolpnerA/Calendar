/**
 * Class representing a calendar
 * @class
 */
class Calendar {
  /**
   * Create a calendar object
   * @constructor
   * @param {Object} element - DOM element
   */
  constructor(element) {
    this.element = element;
    this.currentDate = '2017';
  }

  /**
   * Change month
   */
  changeMonth() {
    // проверить на какую стрелку нажали
    // и добавить или отнять один месяц
  }

  /**
   * Render calendar header
   */
  renderCalendarHeader() {
    // нарисовать стрелки и месяц/год
  }

  /**
   * Render calendar
   */
  renderCalendar() {
    // нарисовать сам календарь
  }

  /**
   * Render calendar header and body
   */
  render() {

    this.renderCalendarHeader();
    this.renderCalendar();
  }
}

export default Calendar;