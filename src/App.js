import React, { Component } from 'react';

/// Modifica el componente para que se puedan agregar tareas, tachar y destacharlas y error de validacion en el input

class App extends Component {
  constructor() {
    super()
    this.state = {
      tasks: [
        { id: 1, name: "Sacar la ropa", done: false },
        { id: 2, name: "Hacer la cama", done: true },
        { id: 3, name: "Leer un rato", done: false }
      ],
      newTask: '',
      error: false
    }

    this.addTask = this.addTask.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.updateTask = this.updateTask.bind(this);
  }

  addTask (e) {
    this.setState({
      newTask: e.target.value,
      error: false
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.newTask === '') {
      this.setState({
        error: true
      })
    } else {
        let cont = this.state.tasks.length;
        let taskObj = {id: cont+1, name: this.state.newTask, done: false};
        this.setState({
          tasks: this.state.tasks.concat(taskObj),
          newTask: ''
        });
    }
  }

  updateTask(id, e) {
    console.log(id)

    this.setState({
      tasks: this.state.tasks.map(task => 
        task.id === id ? {id:task.id, name: task.name, done: !task.done} : task
      )
    })
  }


  render() {
    return (
      <div className="wrapper">
        <div className="list">
          <h3>Por hacer:</h3>
          <ul className="todo">
            {this.state.tasks.map((task, index) => <li className={task.done ? "done" : null} onClick={this.updateTask.bind(this, task.id)} key={task.id}>{task.name}</li>)}
          </ul>
          <form onSubmit={this.handleSubmit}>
            <input type="text" id="new-task" className={ this.state.error ? "error" : null } placeholder="Ingresa una tarea y oprime Enter" onChange={this.addTask} value={this.state.newTask} />
          </form>
        </div>
      </div>
    )
  }
}

export default App;
