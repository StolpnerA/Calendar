class Task {
  constructor(element, taskData, db) {
    this.element = element;
    this.taskData = taskData;
    this.db = db;

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.db.deleteEventInDB(this.taskData.id);
    // костыль чтобы обновить данные))
    window.location.hash = 'calendar';
    window.location.hash = 'all';
  }

  renderTask() {
    const { title, text, done, date } = this.taskData;
    this.element.innerHTML = `
      <div class="task">
        <header>
          <span>Done: ${done ? 'yes' : 'no'}</span>
          <span>Date: ${date}</span>
          <button class="btn btn-danger">Delete</button>
        </header>
        <h3>${title}</h3>
        <p>${text}</p>
      </div>
    `;

    this.element.querySelector('button').addEventListener('click', this.handleClick);
  }
}

export default Task;
