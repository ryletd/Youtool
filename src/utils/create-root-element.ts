export const createRootElement = (id = "root") => {
  const rootElement = document.createElement("section");
  rootElement.id = id;

  document.body.append(rootElement);
};
