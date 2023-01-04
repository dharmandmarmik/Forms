import { useRoutes } from "raviger";
import About from "../components/About";
import Container from "../components/Container";
import Home from "../components/Home";
import HomeForm from "../components/HomeForm";
import PreviewForm from "../components/PreviewForm";

const routes = {
  "/": () => <Home />,
  "/about": () => <About />,
  "/form/:formId": ({ formId }: { formId: string }) => (
    <HomeForm formId={Number(formId)} />
  ),
  "/preview/:formId": ({ formId }: { formId: string }) => (
    <PreviewForm formId={Number(formId)} />
  ),
};

export default function AppRouter() {
  const routeResult = useRoutes(routes);
  return <Container>{routeResult}</Container>;
}
