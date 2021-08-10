import { ModuleTree } from "vuex";

const requireModule = require.context(".", false, /\.store\.ts$/);
const modules: ModuleTree<unknown> = {};

requireModule.keys().forEach((fileName) => {
  const moduleName = fileName
    .replace(/(\.\/|\.store\.js)/g, "")
    .replace(/^\w/, (c) => c.toUpperCase());

  modules[moduleName] = (requireModule(fileName).default ||
    requireModule(fileName)) as ModuleTree<unknown>;
});

export default modules;
