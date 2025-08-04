let expression = "";

function press(val) {
  expression += val;
  document.getElementById("display").value = expression;
}

function clearDisplay() {
  expression = "";
  document.getElementById("display").value = "";
}

function calculate() {
  try {
    let result = eval(expression);
    document.getElementById("display").value = result;
    saveToDatabase(expression, result);
    expression = result.toString();
  } catch (e) {
    document.getElementById("display").value = "Error";
  }
}

function saveToDatabase(expr, res) {
  fetch("/api/log", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ expression: expr, result: res })
  }).then(() => loadHistory());
}

function loadHistory() {
  fetch("/api/history")
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("history");
      list.innerHTML = "";
      data.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.expression} = ${item.result}`;
        list.appendChild(li);
      });
    });
}

window.onload = loadHistory;

