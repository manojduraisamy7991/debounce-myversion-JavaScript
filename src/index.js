// ---- Debounce Function ----
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// ---- Dummy API call ----
async function searchAPI(query) {
  document.getElementById("result").innerHTML = "Loading...";

  // Use real API if needed — this is a dummy JSON call
  const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
  const data = await res.json();

  // Show result count
  document.getElementById(
    "result"
  ).innerHTML = `Found ${data.total} products for: <b>${query}</b>`;
}

// ---- Debounced version of API ----
const debouncedSearch = debounce(searchAPI, 1000);

const btn = document.getElementById("btn");
let timer = null;

// btn.addEventListener("click", () => {
//   clearTimeout(timer);
//   timer = setTimeout(() => {
//     console.log("api calling");
//     searchAPI()
//   }, 1400);
// });

document.getElementById("search").addEventListener("input", (e) => {
  const text = e.target.value.trim();

  if (text === "") {
    document.getElementById("result").innerHTML = "";
    return;
  }
  clearTimeout(timer);
  timer = setTimeout(() => {
    console.log("api calling");
    searchAPI(text);
  }, 1400);
});
