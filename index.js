const axios = require("axios");
const Handlebars = require("handlebars");
const fs = require("fs");

const template = Handlebars.compile(`
<html>
  <head>
    <meta charset="utf-8" />
    <title>My Page</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div class="grid grid-flow-col grid-rows-3 h-screen mt-2">
      <div class="col-span-2 row-span-2 w-full">
        <div class="mr-2 space-y-2 ml-4 p-8">
          <h3 class="text-sm font-light mt-2">{{key}}</h3>
          <h1 class="text-6xl font-bold">{{activity}}</h1>
          <h2 class="text-md py-4 font-bold">
            OUTDOOR & SPORTING GOODS COMPANY
          </h2>
          <div class="py-2 mt-2">
            <button class="bg-orange-600 p-4 px-4 text-white">
              EXPLORE MORE <span class="ml-4"> ---></span>
            </button>
            <h6 class="text-sm font-light py-2">
              we have more special goods for you 🚀
            </h6>
          </div>

          <div class="flex space-x-12 gap-12">
            <div class="flex flex-col">
              <h2 class="text-xs font-light">More Than</h2>
              <h1 class="text-6xl font-bold text-black">50+</h1>
              <h2 class="text-sm">Adventure Product</h2>
            </div>
            <div class="flex flex-col">
              <h2 class="text-xs font-light">More Than</h2>
              <h1 class="text-6xl font-bold text-black">75+</h1>
              <h2 class="text-sm">Outlet in Indonesia</h2>
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-2 mt-40 w-full py-2">
        <div
          class="flex gap-48 bg-stone-800 text-white p-4 justify-center item-center"
        >
          <div class="flex gap-4">
            <img src="./Assets/card-send.svg" alt="My Image" class="w-1/2" />
            <div class="flex-auto mt-2">
              <h3 class="text-sm">ACCESSIBILITY</h3>
              <h1 class="text-lg font-bold text-white">{{accessibility}}</h1>
            </div>
          </div>
          <div class="flex gap-4">
            <img src="./Assets/shield-tick.svg" alt="My Image" class="w-1/2" />
            <div class="flex-auto mt-2">
              <h3 class="text-sm">TYPE</h3>
              <h1 class="text-lg font-bold text-white">SOCIAL</h1>
            </div>
          </div>
        </div>
      </div>

      <div class="row-span-3 w-max">
        <div class="flex justify-end w-full flex-col gap-72">
          <div class="flex flex-col p-8 items-end gap-2">
            <h4 class="text-gray-500 text-sm">PRICE</h4>
            <h4 class="text-sm">{{price}}</h4>
          </div>
        </div>
        <div class="mt-2">
          <img src="./Assets/3image.svg" alt="My Image" class="w-fit" />
        </div>
      </div>
    </div>
  </body>
</html>
`);

async function generatePages() {
  try {
    const requests = [];
    for (let i = 1; i <= 10; i++) {
      requests.push(axios.get("https://www.boredapi.com/api/activity"));
    }
    const responses = await Promise.all(requests);

    const htmlWrites = [];
    responses.forEach((response, i) => {
      if (response.status === 200) {
        const data = {
          activity: response.data.activity,
          key: response.data.key,
          price: `$${(Math.random() * 50).toFixed(2)}`,
          accessibility: response.data.accessibility,
        };

        const html = template(data);

        const fileName = `page-${i + 1}.html`;

        htmlWrites.push(
          new Promise((resolve, reject) => {
            fs.writeFile(fileName, html, (err) => {
              if (err) reject(err);
              else {
                console.log(`Page ${i + 1} saved to ${fileName}`);
                resolve();
              }
            });
          })
        );
      }
    });
    await Promise.all(htmlWrites);
    console.log("All pages saved!");
  } catch (error) {
    console.error(error);
  }
}

generatePages();
