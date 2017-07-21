class Header {
  constructor(element) {
    this.element = element;
  }

  renderHeader() {
    this.element.innerHTML = `
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#calendar">Calendar</a></li>
        <li><a href="#all">All tasks</a></li>
        <li><a href="#dayView">Day</a></li>
      </ul>
    `;
  }
}

export default Header;
