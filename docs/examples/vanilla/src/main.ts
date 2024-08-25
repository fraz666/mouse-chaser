import './style.css'
import 'mouse-chaser'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Vite + TypeScript</h1>
    <p class="read-the-docs">
      Move the mouse around!
    </p>
  </div>
  <mouse-chaser>
    <span style="color:red">follow me</span>
  </mouse-chaser>
`
