export const getAllTasks = async () => {
    const data = JSON.stringify({});
    return await fetch(`https://task-app-node-js-887b.onrender.com/tasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((responseData) => {
        return responseData;
      })
      .catch((err) => {
        console.error(err);
      });
  };