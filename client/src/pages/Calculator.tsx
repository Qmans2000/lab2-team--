import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Moon, Sun } from "lucide-react";

type Operator = "+" | "-" | "×" | "÷" | null;

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("calculator-theme");
    return (saved as "light" | "dark") || "dark";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("calculator-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const inputDigit = useCallback((digit: string) => {
    if (display === "Error") {
      setDisplay(digit);
      setPreviousValue(null);
      setOperator(null);
      setWaitingForOperand(false);
      return;
    }

    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      if (display === "0" && digit !== ".") {
        setDisplay(digit);
      } else if (digit === "." && display.includes(".")) {
        return;
      } else if (display.length < 15) {
        setDisplay(display + digit);
      }
    }
  }, [display, waitingForOperand]);

  const performOperation = useCallback((nextOperator: Operator) => {
    if (display === "Error") {
      setDisplay("0");
      setPreviousValue(null);
      setOperator(null);
      setWaitingForOperand(false);
      return;
    }

    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operator) {
      const currentValue = previousValue;
      let newValue = currentValue;

      switch (operator) {
        case "+":
          newValue = currentValue + inputValue;
          break;
        case "-":
          newValue = currentValue - inputValue;
          break;
        case "×":
          newValue = currentValue * inputValue;
          break;
        case "÷":
          if (inputValue === 0) {
            setDisplay("Error");
            setPreviousValue(null);
            setOperator(null);
            setWaitingForOperand(true);
            return;
          }
          newValue = currentValue / inputValue;
          break;
      }

      const formattedValue = Number.isInteger(newValue)
        ? newValue.toString()
        : parseFloat(newValue.toFixed(8)).toString();

      setDisplay(formattedValue);
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  }, [display, operator, previousValue]);

  const clearAll = useCallback(() => {
    setDisplay("0");
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  }, []);

  const toggleSign = useCallback(() => {
    if (display === "Error") return;
    const value = parseFloat(display);
    setDisplay((value * -1).toString());
  }, [display]);

  const inputPercent = useCallback(() => {
    if (display === "Error") return;
    const value = parseFloat(display);
    setDisplay((value / 100).toString());
  }, [display]);

  const handleBackspace = useCallback(() => {
    if (!waitingForOperand && display !== "0" && display !== "Error") {
      const newDisplay = display.slice(0, -1);
      setDisplay(newDisplay || "0");
    }
  }, [display, waitingForOperand]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      const key = event.key;

      if (key >= "0" && key <= "9") {
        event.preventDefault();
        inputDigit(key);
      } else if (key === ".") {
        event.preventDefault();
        inputDigit(".");
      } else if (key === "+" || key === "-") {
        event.preventDefault();
        performOperation(key);
      } else if (key === "*") {
        event.preventDefault();
        performOperation("×");
      } else if (key === "/") {
        event.preventDefault();
        performOperation("÷");
      } else if (key === "Enter" || key === "=") {
        event.preventDefault();
        performOperation(null);
      } else if (key === "Escape" || key === "c" || key === "C") {
        event.preventDefault();
        clearAll();
      } else if (key === "Backspace") {
        event.preventDefault();
        handleBackspace();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [inputDigit, performOperation, clearAll, handleBackspace]);

  const buttonClass = "text-2xl font-medium transition-all duration-150 hover-elevate active-elevate-2";
  const operatorClass = "text-xl font-medium transition-all duration-150 hover-elevate active-elevate-2";

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Card className="p-6 md:p-8 shadow-2xl">
          <div className="flex justify-end mb-4">
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleTheme}
              className="h-8 w-8"
              data-testid="button-theme-toggle"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          </div>

          <div
            className="bg-card rounded-xl p-6 mb-6 h-24 flex items-center justify-end border border-card-border shadow-inner"
            data-testid="display-screen"
          >
            <div className="font-mono font-light text-4xl md:text-5xl text-foreground truncate">
              {display}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <Button
              variant="secondary"
              className={`${operatorClass} rounded-xl`}
              onClick={clearAll}
              data-testid="button-clear"
            >
              AC
            </Button>
            <Button
              variant="secondary"
              className={`${operatorClass} rounded-xl`}
              onClick={toggleSign}
              data-testid="button-negate"
            >
              +/−
            </Button>
            <Button
              variant="secondary"
              className={`${operatorClass} rounded-xl`}
              onClick={inputPercent}
              data-testid="button-percent"
            >
              %
            </Button>
            <Button
              variant="secondary"
              className={`${operatorClass} rounded-xl`}
              onClick={() => performOperation("÷")}
              data-testid="button-divide"
            >
              ÷
            </Button>

            <Button
              variant="ghost"
              className={`${buttonClass} rounded-xl bg-muted`}
              onClick={() => inputDigit("7")}
              data-testid="button-7"
            >
              7
            </Button>
            <Button
              variant="ghost"
              className={`${buttonClass} rounded-xl bg-muted`}
              onClick={() => inputDigit("8")}
              data-testid="button-8"
            >
              8
            </Button>
            <Button
              variant="ghost"
              className={`${buttonClass} rounded-xl bg-muted`}
              onClick={() => inputDigit("9")}
              data-testid="button-9"
            >
              9
            </Button>
            <Button
              variant="secondary"
              className={`${operatorClass} rounded-xl`}
              onClick={() => performOperation("×")}
              data-testid="button-multiply"
            >
              ×
            </Button>

            <Button
              variant="ghost"
              className={`${buttonClass} rounded-xl bg-muted`}
              onClick={() => inputDigit("4")}
              data-testid="button-4"
            >
              4
            </Button>
            <Button
              variant="ghost"
              className={`${buttonClass} rounded-xl bg-muted`}
              onClick={() => inputDigit("5")}
              data-testid="button-5"
            >
              5
            </Button>
            <Button
              variant="ghost"
              className={`${buttonClass} rounded-xl bg-muted`}
              onClick={() => inputDigit("6")}
              data-testid="button-6"
            >
              6
            </Button>
            <Button
              variant="secondary"
              className={`${operatorClass} rounded-xl`}
              onClick={() => performOperation("-")}
              data-testid="button-subtract"
            >
              −
            </Button>

            <Button
              variant="ghost"
              className={`${buttonClass} rounded-xl bg-muted`}
              onClick={() => inputDigit("1")}
              data-testid="button-1"
            >
              1
            </Button>
            <Button
              variant="ghost"
              className={`${buttonClass} rounded-xl bg-muted`}
              onClick={() => inputDigit("2")}
              data-testid="button-2"
            >
              2
            </Button>
            <Button
              variant="ghost"
              className={`${buttonClass} rounded-xl bg-muted`}
              onClick={() => inputDigit("3")}
              data-testid="button-3"
            >
              3
            </Button>
            <Button
              variant="secondary"
              className={`${operatorClass} rounded-xl`}
              onClick={() => performOperation("+")}
              data-testid="button-add"
            >
              +
            </Button>

            <Button
              variant="ghost"
              className={`${buttonClass} rounded-xl bg-muted col-span-2`}
              onClick={() => inputDigit("0")}
              data-testid="button-0"
            >
              0
            </Button>
            <Button
              variant="ghost"
              className={`${buttonClass} rounded-xl bg-muted`}
              onClick={() => inputDigit(".")}
              data-testid="button-decimal"
            >
              .
            </Button>
            <Button
              variant="default"
              className={`${operatorClass} rounded-xl bg-primary text-primary-foreground border border-primary-border`}
              onClick={() => performOperation(null)}
              data-testid="button-equals"
            >
              =
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
