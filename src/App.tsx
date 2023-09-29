import classes from './App.module.css'
import { Card, CardBody } from "@nextui-org/react";

function App() {

  return (
      <div className={classes.app_container}>
          <Card>
              <CardBody>
                  <h1>Команда OBeMe - Финансовое поведение</h1>
              </CardBody>
          </Card>
      </div>
  )
}

export default App
