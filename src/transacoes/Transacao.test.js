import React from "react";
import { render } from "@testing-library/react";
import Transacao from "./Transacao";

describe("Componente transação do extrato", () => {
  it("Deve permanecer sempre o mesmo snapshot do component", () => {
    const { container } = render(<Transacao data="08/09/2022" tipo="saque" valor="20.00" />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
