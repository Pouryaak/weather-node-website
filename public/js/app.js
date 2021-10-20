const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const messageThree = document.querySelector("#message-3");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  const location = search.value;
  fetch("/weather?address=" + location)
    .then((res) => {
      res.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
        } else {
          messageOne.textContent = data.address;
          messageTwo.textContent = data.forecast;
          messageThree.textContent = "Wind Speed is " + data.wind_speed;
          search.value = "";
          var test_variable = "";
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
