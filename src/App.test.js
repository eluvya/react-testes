import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App, { calcularNovoSaldo } from "./App";

describe("Componente principal", () => {
  describe("Ao renderizar o componente principal", () => {
    it("Deve mostrar o nome do banco", () => {
      render(<App />);

      expect(screen.getByText("ByteBank")).toBeInTheDocument();
    });

    it("Deve mostrar o saldo", () => {
      render(<App />);

      expect(screen.getByText("Saldo:")).toBeInTheDocument();
    });

    it("Deve mostrar o botão de realizar transação", () => {
      render(<App />);

      expect(screen.getByText("Realizar operação")).toBeInTheDocument();
    });
  });

  describe("Ao realizar uma transação", () => {
    it("Deve realizar um saque e diminuir o saldo", () => {
      const valores = {
        transacao: "saque",
        valor: 50,
      };

      const saldoAtual = calcularNovoSaldo(valores, 150);

      expect(saldoAtual).toBe(100);
    });

    it("Deve realizar um deposito e aumentar o saldo", () => {
      const valores = {
        transacao: "deposito",
        valor: 50,
      };

      const saldoAtual = calcularNovoSaldo(valores, 150);

      expect(saldoAtual).toBe(200);
    });

    it("Deve realizar um saque", () => {
      render(<App />);

      const saldoAtual = screen.getByText("R$ 1000");
      const transacao = screen.getByLabelText("Saque");
      const valor = screen.getByTestId("valor");
      const botaoTransacao = screen.getByText("Realizar operação");

      expect(saldoAtual.textContent).toBe("R$ 1000");

      fireEvent.click(transacao, { target: { value: "saque" } });
      fireEvent.change(valor, { target: { value: 10 } });
      fireEvent.click(botaoTransacao);

      expect(saldoAtual.textContent).toBe("R$ 990");
    });
  });
});
