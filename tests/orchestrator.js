import retry from "async-retry";

async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 50,
      maxTimeout: 1000,
    });

    async function fetchStatusPage() {
      const response = await fetch(process.env.COSMUS_URL + "/api/v1/status");

      if (response.status != 200) throw Error();
    }
  }
}

const orchestrator = {
  waitForAllServices,
};

export default orchestrator;
