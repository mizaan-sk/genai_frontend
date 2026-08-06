import { RouterProvider } from "react-router";
import { router } from "./app.route.jsx";
import { AuthProvider } from "./features/services/auth.context.jsx";
import { InterviewProvider } from "./features/interview/interview.context.jsx";
import { ThemeProvider } from "./features/theme/theme.context.jsx";
import { useSmoothScroll } from "./hooks/useSmoothScroll.js";

function App() {
  useSmoothScroll();

  return (
    <ThemeProvider>
      <AuthProvider>
        <InterviewProvider>
          <RouterProvider router={router} />
        </InterviewProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App;
