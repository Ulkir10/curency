const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amountInput = document.getElementById("amountInput");
const result = document.getElementById("result");
const getExchangeRateBtn = document.getElementById("getExchangeRateBtn");
const swapBtn = document.getElementById("swapBtn");

const apiKey = "6489d5a9eaa061f37c905b2b"; // твой API ключ
const apiBase = "https://v6.exchangerate-api.com/v6";

// Предустановленные валюты (можно расширить)
const currencyList = ["USD", "UZS", "EUR", "RUB", "GBP", "JPY", "CNY", "KZT"];

// Заполняем выпадающие списки
currencyList.forEach(currency => {
  const option1 = document.createElement("option");
  const option2 = document.createElement("option");
  option1.value = option1.textContent = currency;
  option2.value = option2.textContent = currency;
  fromCurrency.appendChild(option1);
  toCurrency.appendChild(option2);
});

fromCurrency.value = "USD";
toCurrency.value = "UZS";

// Обработчик кнопки "Get Exchange Rate"
getExchangeRateBtn.addEventListener("click", async () => {
  const amount = parseFloat(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (isNaN(amount) || amount <= 0) {
    result.textContent = "Enter a valid amount";
    return;
  }

  try {
    const response = await fetch(`${apiBase}/${apiKey}/pair/${from}/${to}/${amount}`);
    const data = await response.json();

    if (data.result === "success") {
      result.textContent = `${amount} ${from} = ${data.conversion_result} ${to}`;
    } else {
      result.textContent = "Failed to fetch exchange rate";
    }
  } catch (error) {
    result.textContent = "Error fetching data";
    console.error(error);
  }
});

// Кнопка Swap — меняет валюты местами
swapBtn.addEventListener("click", () => {
  const temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;
});
