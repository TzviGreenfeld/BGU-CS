import { render, screen } from "@testing-library/react";
import Header from "../../components/Header";
import index from '../../pages/index'

describe("Header Component", () => {
  it(`should contain login, signup and feed links`, () => {
    mount(<index />);
    const links = ["Feed", "Sign up", "Log in"];
    links.forEach((linkString) => {
      const element = screen.getByText(linkString);
      expect(element).toBeDefined();
    });
  });
});
