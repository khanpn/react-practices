import { Container } from "@mui/material";
import "./App.css";
import ExpenseTracking from "./components/ExpenseTracking";

function App() {
  return (
    <>
      <Container maxWidth="sm">
        <ExpenseTracking />
      </Container>
    </>
  );
}

export default App;
