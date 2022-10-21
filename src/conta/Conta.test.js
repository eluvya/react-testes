import Conta from "./Conta";
import React from "react";
const { render, screen, fireEvent } = require("@testing-library/react");

describe("Componente de conta", () => {
  it("Deve exibir o saldo como valor monetário", () => {
    render(<Conta saldo={1000} />);

    const saldo = screen.getByTestId("saldo-conta");

    expect(saldo.textContent).toBe("R$ 1000");
  });

  it("Deve chamar a função de realizar trasação ao clicar no botão", () => {
    const funcaoRealizarTransacao = jest.fn();

    render(<Conta saldo={1000} realizarTransacao={funcaoRealizarTransacao} />);

    fireEvent.click(screen.getByText("Realizar operação"));

    expect(funcaoRealizarTransacao).toHaveBeenCalled();
  });
});
