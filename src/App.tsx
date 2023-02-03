import { ThemeProvider } from "styled-components";
import { Button } from "./components/Button";
import { GlobaStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/default";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme} >
      <GlobaStyle /> 
      <Button variant="primary" />
      <Button variant="secondary" />
      <Button variant="danger" />
      <Button variant="sucess" />
    </ThemeProvider>
  );
}
